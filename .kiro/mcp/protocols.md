# Model Context Protocol (MCP) Servers for CodePhoenix

## Overview
Custom MCP servers provide specialized parsing and analysis for legacy languages.

---

## MCP Server 1: COBOL Parser

### Purpose
Deep parsing and understanding of COBOL codebases

### Capabilities
- Parse COBOL syntax (all divisions)
- Extract business logic
- Map data structures
- Identify file operations
- Analyze PERFORM statements
- Convert PICTURE clauses

### Protocol Definition
```json
{
  "name": "cobol-parser",
  "version": "1.0.0",
  "capabilities": {
    "parse": {
      "input": {
        "code": "string",
        "dialect": "string" // COBOL-74, COBOL-85, etc.
      },
      "output": {
        "ast": "object",
        "divisions": "array",
        "dataStructures": "array",
        "procedures": "array"
      }
    },
    "extractBusinessLogic": {
      "input": {
        "ast": "object"
      },
      "output": {
        "rules": "array",
        "calculations": "array",
        "validations": "array"
      }
    },
    "convertPicture": {
      "input": {
        "pictureClause": "string"
      },
      "output": {
        "typescriptType": "string",
        "validation": "string"
      }
    }
  }
}
```

### Implementation
```typescript
// mcp/cobol-parser/server.ts
import { MCPServer } from '@/lib/mcp';

export class COBOLParserServer extends MCPServer {
  name = 'cobol-parser';
  version = '1.0.0';

  async parse(code: string, dialect: string = 'COBOL-85') {
    const ast = this.parseToAST(code);
    
    return {
      ast,
      divisions: this.extractDivisions(ast),
      dataStructures: this.extractDataStructures(ast),
      procedures: this.extractProcedures(ast)
    };
  }

  private parseToAST(code: string) {
    // Tokenize COBOL code
    const tokens = this.tokenize(code);
    
    // Build AST
    const ast = {
      type: 'Program',
      divisions: {
        identification: null,
        environment: null,
        data: null,
        procedure: null
      }
    };

    let currentDivision = null;
    let currentSection = null;

    for (const token of tokens) {
      if (token.type === 'DIVISION') {
        currentDivision = token.value;
        ast.divisions[currentDivision.toLowerCase()] = {
          type: 'Division',
          name: currentDivision,
          sections: []
        };
      } else if (token.type === 'SECTION') {
        currentSection = {
          type: 'Section',
          name: token.value,
          entries: []
        };
        ast.divisions[currentDivision.toLowerCase()].sections.push(currentSection);
      } else if (token.type === 'ENTRY') {
        currentSection.entries.push({
          level: token.level,
          name: token.name,
          picture: token.picture,
          value: token.value
        });
      }
    }

    return ast;
  }

  private extractDataStructures(ast: any) {
    const dataDiv = ast.divisions.data;
    if (!dataDiv) return [];

    const structures = [];

    for (const section of dataDiv.sections) {
      if (section.name === 'WORKING-STORAGE') {
        for (const entry of section.entries) {
          structures.push({
            level: entry.level,
            name: entry.name,
            type: this.pictureToType(entry.picture),
            initialValue: entry.value
          });
        }
      }
    }

    return structures;
  }

  private pictureToType(picture: string): string {
    if (!picture) return 'string';
    
    // 9(5) -> number (5 digits)
    if (/9+/.test(picture)) {
      const hasDecimal = picture.includes('V');
      return hasDecimal ? 'decimal' : 'integer';
    }
    
    // X(20) -> string (20 chars)
    if (/X+/.test(picture)) {
      return 'string';
    }
    
    // A(10) -> string (alphabetic)
    if (/A+/.test(picture)) {
      return 'string';
    }

    return 'unknown';
  }

  async extractBusinessLogic(ast: any) {
    const procedureDiv = ast.divisions.procedure;
    if (!procedureDiv) return { rules: [], calculations: [], validations: [] };

    const logic = {
      rules: [],
      calculations: [],
      validations: []
    };

    // Parse procedure division statements
    for (const section of procedureDiv.sections) {
      for (const statement of section.statements || []) {
        if (statement.type === 'COMPUTE') {
          logic.calculations.push({
            target: statement.target,
            formula: statement.expression,
            lineNumber: statement.line
          });
        } else if (statement.type === 'IF') {
          logic.validations.push({
            condition: statement.condition,
            consequence: statement.then,
            alternative: statement.else,
            lineNumber: statement.line
          });
        } else if (statement.type === 'EVALUATE') {
          logic.rules.push({
            input: statement.subject,
            cases: statement.cases,
            default: statement.default,
            lineNumber: statement.line
          });
        }
      }
    }

    return logic;
  }

  async convertPicture(pictureClause: string) {
    const type = this.pictureToType(pictureClause);
    
    const typeMap = {
      'integer': 'number',
      'decimal': 'number',
      'string': 'string',
      'unknown': 'any'
    };

    const validationMap = {
      'integer': 'z.number().int()',
      'decimal': 'z.number()',
      'string': `z.string().max(${this.extractLength(pictureClause)})`,
      'unknown': 'z.any()'
    };

    return {
      typescriptType: typeMap[type],
      validation: validationMap[type]
    };
  }

  private extractLength(picture: string): number {
    const match = picture.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : 255;
  }
}
```

---

## MCP Server 2: Fortran Analyzer

### Purpose
Analyze and parse Fortran scientific code

### Protocol Definition
```json
{
  "name": "fortran-analyzer",
  "version": "1.0.0",
  "capabilities": {
    "parseSubroutines": {
      "input": { "code": "string" },
      "output": { "subroutines": "array" }
    },
    "analyzeArrays": {
      "input": { "code": "string" },
      "output": { "arrays": "array" }
    },
    "extractCommonBlocks": {
      "input": { "code": "string" },
      "output": { "blocks": "array" }
    }
  }
}
```

### Implementation
```typescript
// mcp/fortran-analyzer/server.ts
export class FortranAnalyzerServer extends MCPServer {
  name = 'fortran-analyzer';
  version = '1.0.0';

  async parseSubroutines(code: string) {
    const subroutinePattern = /SUBROUTINE\s+(\w+)\s*\((.*?)\)([\s\S]*?)END\s+SUBROUTINE/gi;
    const subroutines = [];

    let match;
    while ((match = subroutinePattern.exec(code)) !== null) {
      const [, name, params, body] = match;
      
      subroutines.push({
        name,
        parameters: params.split(',').map(p => p.trim()),
        body: body.trim(),
        variables: this.extractVariables(body),
        operations: this.extractOperations(body)
      });
    }

    return { subroutines };
  }

  async analyzeArrays(code: string) {
    const dimensionPattern = /DIMENSION\s+(\w+)\s*\(([\d,\s:]+)\)/gi;
    const realArrayPattern = /REAL(?:\*\d+)?\s*::\s*(\w+)\s*\(([\d,\s:]+)\)/gi;
    
    const arrays = [];

    // Parse DIMENSION statements
    let match;
    while ((match = dimensionPattern.exec(code)) !== null) {
      arrays.push({
        name: match[1],
        dimensions: match[2].split(',').map(d => d.trim()),
        type: 'REAL' // Default type
      });
    }

    // Parse modern Fortran array declarations
    while ((match = realArrayPattern.exec(code)) !== null) {
      arrays.push({
        name: match[1],
        dimensions: match[2].split(',').map(d => d.trim()),
        type: 'REAL'
      });
    }

    return { arrays };
  }

  async extractCommonBlocks(code: string) {
    const commonPattern = /COMMON\s+\/(\w+)\/\s+([\w,\s]+)/gi;
    const blocks = [];

    let match;
    while ((match = commonPattern.exec(code)) !== null) {
      blocks.push({
        name: match[1],
        variables: match[2].split(',').map(v => v.trim())
      });
    }

    return { blocks };
  }

  private extractVariables(code: string) {
    const variables = [];
    const patterns = [
      /(?:INTEGER|REAL|DOUBLE\s+PRECISION|CHARACTER|LOGICAL|COMPLEX)\s*(?:::)?\s*([\w,\s]+)/gi
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(code)) !== null) {
        const vars = match[1].split(',').map(v => v.trim());
        variables.push(...vars);
      }
    }

    return variables;
  }

  private extractOperations(code: string) {
    const operations = {
      loops: [],
      conditionals: [],
      assignments: []
    };

    // Extract DO loops
    const doPattern = /DO\s+(\d+)?\s*(\w+)\s*=\s*([\d\w]+)\s*,\s*([\d\w]+)(?:\s*,\s*([\d\w]+))?/gi;
    let match;
    while ((match = doPattern.exec(code)) !== null) {
      operations.loops.push({
        type: 'DO',
        variable: match[2],
        start: match[3],
        end: match[4],
        step: match[5] || '1'
      });
    }

    // Extract IF statements
    const ifPattern = /IF\s*\((.*?)\)\s+THEN/gi;
    while ((match = ifPattern.exec(code)) !== null) {
      operations.conditionals.push({
        type: 'IF',
        condition: match[1]
      });
    }

    return operations;
  }
}
```

---

## MCP Server 3: Legacy Database Schema Reader

### Purpose
Extract and analyze database schemas from legacy systems

### Protocol Definition
```json
{
  "name": "legacy-db-reader",
  "version": "1.0.0",
  "capabilities": {
    "parseSchema": {
      "input": { "dialect": "string", "ddl": "string" },
      "output": { "tables": "array", "relationships": "array" }
    },
    "generatePrismaSchema": {
      "input": { "tables": "array" },
      "output": { "schema": "string" }
    },
    "suggestMigration": {
      "input": { "tables": "array" },
      "output": { "strategy": "object" }
    }
  }
}
```

### Implementation
```typescript
// mcp/legacy-db-reader/server.ts
export class LegacyDBReaderServer extends MCPServer {
  name = 'legacy-db-reader';
  version = '1.0.0';

  async parseSchema(dialect: string, ddl: string) {
    const tables = [];
    const relationships = [];

    if (dialect === 'DB2') {
      return this.parseDB2Schema(ddl);
    } else if (dialect === 'Oracle') {
      return this.parseOracleSchema(ddl);
    } else if (dialect === 'SQL Server') {
      return this.parseSQLServerSchema(ddl);
    }

    return { tables, relationships };
  }

  private parseDB2Schema(ddl: string) {
    const tables = [];
    const createTablePattern = /CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]*?)\)/gi;

    let match;
    while ((match = createTablePattern.exec(ddl)) !== null) {
      const tableName = match[1];
      const columnsStr = match[2];
      
      const columns = this.parseColumns(columnsStr);
      
      tables.push({
        name: tableName,
        columns,
        constraints: this.extractConstraints(columnsStr)
      });
    }

    const relationships = this.extractRelationships(ddl);

    return { tables, relationships };
  }

  private parseColumns(columnsStr: string) {
    const columns = [];
    const lines = columnsStr.split(',');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('CONSTRAINT') || trimmed.startsWith('PRIMARY') || trimmed.startsWith('FOREIGN')) {
        continue;
      }

      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        columns.push({
          name: parts[0],
          type: parts[1],
          nullable: !trimmed.includes('NOT NULL'),
          primaryKey: trimmed.includes('PRIMARY KEY')
        });
      }
    }

    return columns;
  }

  async generatePrismaSchema(tables: any[]) {
    let schema = 'datasource db {\n';
    schema += '  provider = "postgresql"\n';
    schema += '  url      = env("DATABASE_URL")\n';
    schema += '}\n\n';
    schema += 'generator client {\n';
    schema += '  provider = "prisma-client-js"\n';
    schema += '}\n\n';

    for (const table of tables) {
      schema += `model ${this.toPascalCase(table.name)} {\n`;
      
      for (const column of table.columns) {
        const prismaType = this.dbTypeToPrismaType(column.type);
        const nullable = column.nullable ? '?' : '';
        const pk = column.primaryKey ? ' @id @default(autoincrement())' : '';
        
        schema += `  ${column.name} ${prismaType}${nullable}${pk}\n`;
      }
      
      schema += '}\n\n';
    }

    return { schema };
  }

  private dbTypeToPrismaType(dbType: string): string {
    const typeMap: { [key: string]: string } = {
      'VARCHAR': 'String',
      'CHAR': 'String',
      'TEXT': 'String',
      'INTEGER': 'Int',
      'INT': 'Int',
      'SMALLINT': 'Int',
      'BIGINT': 'BigInt',
      'DECIMAL': 'Decimal',
      'NUMERIC': 'Decimal',
      'FLOAT': 'Float',
      'DOUBLE': 'Float',
      'DATE': 'DateTime',
      'TIMESTAMP': 'DateTime',
      'BOOLEAN': 'Boolean',
      'BLOB': 'Bytes',
    };

    const baseType = dbType.split('(')[0].toUpperCase();
    return typeMap[baseType] || 'String';
  }

  private toPascalCase(str: string): string {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  async suggestMigration(tables: any[]) {
    return {
      strategy: {
        approach: 'Incremental migration using Strangler Fig pattern',
        phases: [
          {
            name: 'Dual-write setup',
            description: 'Write to both old and new databases',
            duration: '2-4 weeks'
          },
          {
            name: 'Data sync',
            description: 'Migrate historical data in batches',
            duration: '1-2 weeks'
          },
          {
            name: 'Read migration',
            description: 'Gradually shift reads to new database',
            duration: '2-3 weeks'
          },
          {
            name: 'Cutover',
            description: 'Complete switch to new database',
            duration: '1 week'
          }
        ],
        risks: [
          'Data consistency during dual-write period',
          'Performance impact during sync',
          'Rollback complexity'
        ],
        recommendations: [
          'Use database triggers for automatic dual-write',
          'Implement data validation checks',
          'Set up monitoring and alerting',
          'Plan for rollback scenarios'
        ]
      }
    };
  }

  private extractRelationships(ddl: string): any[] {
    const relationships = [];
    const fkPattern = /FOREIGN\s+KEY\s*\((.*?)\)\s+REFERENCES\s+(\w+)\s*\((.*?)\)/gi;

    let match;
    while ((match = fkPattern.exec(ddl)) !== null) {
      relationships.push({
        from: match[1],
        to: match[2],
        toColumn: match[3]
      });
    }

    return relationships;
  }

  private extractConstraints(columnsStr: string): any[] {
    const constraints = [];
    const lines = columnsStr.split(',');

    for (const line of lines) {
      if (line.includes('CONSTRAINT')) {
        constraints.push({
          type: line.includes('PRIMARY') ? 'PRIMARY KEY' : line.includes('FOREIGN') ? 'FOREIGN KEY' : 'CHECK',
          definition: line.trim()
        });
      }
    }

    return constraints;
  }
}
```

---

## MCP Integration

### Server Registry
```typescript
// lib/mcp/registry.ts
import { COBOLParserServer } from '@/mcp/cobol-parser/server';
import { FortranAnalyzerServer } from '@/mcp/fortran-analyzer/server';
import { LegacyDBReaderServer } from '@/mcp/legacy-db-reader/server';

export const mcpServers = {
  'cobol-parser': new COBOLParserServer(),
  'fortran-analyzer': new FortranAnalyzerServer(),
  'legacy-db-reader': new LegacyDBReaderServer(),
};

export async function callMCP(
  serverName: string,
  method: string,
  params: any
): Promise<any> {
  const server = mcpServers[serverName];
  
  if (!server) {
    throw new Error(`MCP server not found: ${serverName}`);
  }

  if (typeof server[method] !== 'function') {
    throw new Error(`Method not found: ${method}`);
  }

  return await server[method](...Object.values(params));
}
```

### Usage in API
```typescript
// app/api/analyze/route.ts
import { callMCP } from '@/lib/mcp/registry';

export async function POST(request: NextRequest) {
  const { code, language } = await request.json();

  let analysis;

  if (language === 'COBOL') {
    // Use COBOL MCP server
    const parsed = await callMCP('cobol-parser', 'parse', { code });
    const businessLogic = await callMCP('cobol-parser', 'extractBusinessLogic', { ast: parsed.ast });
    
    analysis = {
      ...parsed,
      businessLogic
    };
  } else if (language === 'Fortran') {
    // Use Fortran MCP server
    const subroutines = await callMCP('fortran-analyzer', 'parseSubroutines', { code });
    const arrays = await callMCP('fortran-analyzer', 'analyzeArrays', { code });
    
    analysis = {
      subroutines,
      arrays
    };
  }

  return NextResponse.json({ analysis });
}
```
