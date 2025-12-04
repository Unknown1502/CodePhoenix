// Mock transformation data for demo (no API keys required)

export const MOCK_TRANSFORMATIONS = {
  cobol: {
    original: `IDENTIFICATION DIVISION.
PROGRAM-ID. INVENTORY-SYSTEM.
AUTHOR. LEGACY-DEVELOPER.

ENVIRONMENT DIVISION.
CONFIGURATION SECTION.

DATA DIVISION.
WORKING-STORAGE SECTION.
01 ITEM-RECORD.
   05 ITEM-ID         PIC 9(6).
   05 ITEM-NAME       PIC X(30).
   05 ITEM-PRICE      PIC 9(5)V99.
   05 ITEM-QUANTITY   PIC 9(4).
   
01 TOTAL-VALUE       PIC 9(8)V99.
01 WS-EOF            PIC A(1).

PROCEDURE DIVISION.
MAIN-LOGIC.
    PERFORM INITIALIZATION.
    PERFORM PROCESS-ITEMS UNTIL WS-EOF = 'Y'.
    PERFORM FINALIZATION.
    STOP RUN.

INITIALIZATION.
    MOVE 'N' TO WS-EOF.
    MOVE ZERO TO TOTAL-VALUE.
    DISPLAY "Inventory System Started".

PROCESS-ITEMS.
    MOVE 123456 TO ITEM-ID.
    MOVE "Widget A" TO ITEM-NAME.
    MOVE 99.99 TO ITEM-PRICE.
    MOVE 100 TO ITEM-QUANTITY.
    
    COMPUTE TOTAL-VALUE = TOTAL-VALUE + (ITEM-PRICE * ITEM-QUANTITY).
    DISPLAY "Processed: " ITEM-NAME.
    MOVE 'Y' TO WS-EOF.

FINALIZATION.
    DISPLAY "Total Value: " TOTAL-VALUE.
    DISPLAY "Inventory System Complete".`,

    transformed: `// Modernized Inventory System
// Transformed from COBOL to TypeScript

interface ItemRecord {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemQuantity: number;
}

class InventorySystem {
  private totalValue: number = 0;
  private items: ItemRecord[] = [];

  async main(): Promise<void> {
    await this.initialization();
    await this.processItems();
    await this.finalization();
  }

  private async initialization(): Promise<void> {
    this.totalValue = 0;
    console.log('Inventory System Started');
  }

  private async processItems(): Promise<void> {
    const item: ItemRecord = {
      itemId: 123456,
      itemName: 'Widget A',
      itemPrice: 99.99,
      itemQuantity: 100
    };

    this.items.push(item);
    this.totalValue += item.itemPrice * item.itemQuantity;
    console.log(\`Processed: \${item.itemName}\`);
  }

  private async finalization(): Promise<void> {
    console.log(\`Total Value: $\${this.totalValue.toFixed(2)}\`);
    console.log('Inventory System Complete');
  }
}

// Execute the system
const system = new InventorySystem();
system.main().catch(console.error);

export default InventorySystem;`
  },

  vb6: {
    original: `Private Sub btnCalculate_Click()
    Dim num1 As Double
    Dim num2 As Double
    Dim result As Double
    Dim operation As String
    
    On Error GoTo ErrorHandler
    
    num1 = Val(txtNum1.Text)
    num2 = Val(txtNum2.Text)
    operation = cboOperation.Text
    
    Select Case operation
        Case "Add"
            result = num1 + num2
        Case "Subtract"
            result = num1 - num2
        Case "Multiply"
            result = num1 * num2
        Case "Divide"
            If num2 <> 0 Then
                result = num1 / num2
            Else
                MsgBox "Cannot divide by zero!", vbCritical
                Exit Sub
            End If
        Case Else
            MsgBox "Invalid operation!", vbExclamation
            Exit Sub
    End Select
    
    lblResult.Caption = "Result: " & Format(result, "0.00")
    Exit Sub
    
ErrorHandler:
    MsgBox "Error: " & Err.Description, vbCritical
End Sub`,

    transformed: `import React, { useState } from 'react';

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [operation, setOperation] = useState<string>('Add');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      setError('');
      
      const n1 = parseFloat(num1);
      const n2 = parseFloat(num2);

      if (isNaN(n1) || isNaN(n2)) {
        setError('Please enter valid numbers');
        return;
      }

      let calculatedResult: number;

      switch (operation) {
        case 'Add':
          calculatedResult = n1 + n2;
          break;
        case 'Subtract':
          calculatedResult = n1 - n2;
          break;
        case 'Multiply':
          calculatedResult = n1 * n2;
          break;
        case 'Divide':
          if (n2 === 0) {
            setError('Cannot divide by zero!');
            return;
          }
          calculatedResult = n1 / n2;
          break;
        default:
          setError('Invalid operation!');
          return;
      }

      setResult(\`Result: \${calculatedResult.toFixed(2)}\`);
    } catch (err) {
      setError(\`Error: \${err instanceof Error ? err.message : 'Unknown error'}\`);
    }
  };

  return (
    <div className="calculator p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Calculator</h2>
      
      <div className="space-y-4">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Number 1"
          className="w-full px-4 py-2 border rounded"
        />
        
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option>Add</option>
          <option>Subtract</option>
          <option>Multiply</option>
          <option>Divide</option>
        </select>
        
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Number 2"
          className="w-full px-4 py-2 border rounded"
        />
        
        <button
          onClick={handleCalculate}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate
        </button>
        
        {result && (
          <div className="text-lg font-semibold text-green-600">{result}</div>
        )}
        
        {error && (
          <div className="text-red-600 font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Calculator;`
  },

  php: {
    original: `<?php
// Legacy user management system
mysql_connect("localhost", "root", "password123");
mysql_select_db("company_db");

$user_id = $_GET['id'];
$action = $_POST['action'];

// Direct SQL injection vulnerability
$query = "SELECT * FROM users WHERE id = $user_id";
$result = mysql_query($query);

if ($action == "delete") {
    $delete_query = "DELETE FROM users WHERE id = $user_id";
    mysql_query($delete_query);
    echo "User deleted successfully!";
}

while($row = mysql_fetch_array($result)) {
    echo "<div class='user'>";
    echo "<h2>" . $row['name'] . "</h2>";
    echo "<p>Email: " . $row['email'] . "</p>";
    echo "<p>Role: " . $row['role'] . "</p>";
    echo "<form method='post'>";
    echo "<input type='hidden' name='action' value='delete'>";
    echo "<button>Delete User</button>";
    echo "</form>";
    echo "</div>";
}

mysql_close();
?>`,

    transformed: `import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Input validation schema
const userIdSchema = z.string().uuid();
const actionSchema = z.enum(['delete', 'update', 'view']);

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validate input (prevents SQL injection)
    const userId = userIdSchema.parse(req.query.id);
    
    if (req.method === 'GET') {
      // Safe parameterized query
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ user });
    }

    if (req.method === 'DELETE') {
      // Check permissions (add your auth logic)
      const isAuthorized = await checkUserPermissions(req);
      
      if (!isAuthorized) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      // Safe deletion with transaction
      await prisma.user.delete({
        where: { id: userId }
      });

      return res.status(200).json({ 
        message: 'User deleted successfully' 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('User API Error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid input',
        details: error.errors 
      });
    }

    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

async function checkUserPermissions(req: NextApiRequest): Promise<boolean> {
  // Implement your authentication/authorization logic
  // Example: check JWT token, verify role, etc.
  return true;
}

export { type User };`
  }
};

export const MOCK_ANALYSIS = {
  cobol: {
    language: 'COBOL',
    languageVersion: 'COBOL-85',
    linesOfCode: 45,
    complexity: 6,
    maintainability: 45,
    businessLogic: [
      'Inventory management system',
      'Item record processing with ID, name, price, quantity',
      'Total value calculation across items',
      'Sequential processing with EOF control'
    ],
    dependencies: [
      'IDENTIFICATION DIVISION',
      'WORKING-STORAGE SECTION',
      'PROCEDURE DIVISION'
    ],
    securityIssues: [
      {
        severity: 'medium',
        description: 'No input validation on item data',
        line: 28
      },
      {
        severity: 'low',
        description: 'Hardcoded display messages',
        line: 21
      }
    ],
    technicalDebt: [
      'Procedural programming style (no OOP)',
      'Limited error handling',
      'No database integration',
      'Sequential processing only'
    ],
    estimatedMigrationTime: '4-6 weeks',
    recommendedTarget: 'TypeScript with Node.js',
    migrationComplexity: 'Medium'
  },

  vb6: {
    language: 'Visual Basic 6',
    languageVersion: 'VB6',
    linesOfCode: 32,
    complexity: 4,
    maintainability: 60,
    businessLogic: [
      'Basic calculator with four operations',
      'Input validation and error handling',
      'Division by zero protection',
      'User-friendly error messages'
    ],
    dependencies: [
      'Form controls: txtNum1, txtNum2, cboOperation, lblResult',
      'VB6 runtime libraries',
      'Error handling (On Error GoTo)'
    ],
    securityIssues: [
      {
        severity: 'low',
        description: 'Client-side only validation',
        line: 8
      }
    ],
    technicalDebt: [
      'Tight coupling to UI (forms)',
      'No separation of concerns',
      'Desktop-only (no web support)',
      'Legacy VB6 runtime required'
    ],
    estimatedMigrationTime: '2-3 weeks',
    recommendedTarget: 'React with TypeScript',
    migrationComplexity: 'Low'
  },

  php: {
    language: 'PHP (Legacy)',
    languageVersion: 'PHP 5.x',
    linesOfCode: 28,
    complexity: 5,
    maintainability: 30,
    businessLogic: [
      'User management CRUD operations',
      'User profile display',
      'Delete user functionality',
      'Database query and display'
    ],
    dependencies: [
      'mysql_* functions (deprecated)',
      'MySQL database',
      'GET/POST parameters'
    ],
    securityIssues: [
      {
        severity: 'critical',
        description: 'SQL Injection vulnerability in query',
        line: 8
      },
      {
        severity: 'critical',
        description: 'Hardcoded database credentials',
        line: 3
      },
      {
        severity: 'high',
        description: 'No CSRF protection on delete action',
        line: 11
      },
      {
        severity: 'medium',
        description: 'No input sanitization',
        line: 5
      }
    ],
    technicalDebt: [
      'Deprecated mysql_* functions',
      'No MVC architecture',
      'Mixed HTML and PHP',
      'No authentication/authorization',
      'No error handling',
      'No prepared statements'
    ],
    estimatedMigrationTime: '6-8 weeks',
    recommendedTarget: 'Next.js API Routes with Prisma',
    migrationComplexity: 'High (security critical)'
  }
};
