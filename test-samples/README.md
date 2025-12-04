# Test Sample Files for CodePhoenix

These are authentic legacy code samples to test the CodePhoenix transformation engine.

## Files Included

### 1. `inventory.cbl` - COBOL Inventory System
- **Language**: COBOL (1985 era)
- **Purpose**: Simple inventory management system
- **Features**:
  - Item record processing
  - Price calculation
  - Total value computation
- **Transformation Target**: TypeScript/Node.js

### 2. `calculator.vb` - Visual Basic 6 Calculator
- **Language**: Visual Basic 6
- **Purpose**: Desktop calculator application
- **Features**:
  - Basic arithmetic operations
  - Input validation
  - Error handling
- **Transformation Target**: React with TypeScript

### 3. `users.php` - PHP User Management
- **Language**: PHP 5.2 (deprecated)
- **Purpose**: User management system
- **Security Issues** (intentional for demo):
  - SQL injection vulnerabilities
  - Hardcoded credentials
  - No CSRF protection
  - XSS vulnerabilities
  - Deprecated mysql_* functions
- **Transformation Target**: Next.js API Routes with Prisma

## How to Use

1. **In the CodePhoenix Web App**:
   - Navigate to http://localhost:3000
   - Drag and drop any of these files into the upload zone
   - Click "Analyze" to see the AI analysis
   - Click "Transform" to see the modernized code

2. **Expected Results**:
   - **COBOL** → Modern TypeScript with classes and async/await
   - **VB6** → React component with hooks and TypeScript
   - **PHP** → Secure Next.js API with Prisma and Zod validation

## Demo Flow

```bash
# 1. Upload a file (e.g., inventory.cbl)
# 2. View analysis results:
#    - Business logic extraction
#    - Dependency mapping
#    - Security scan (shows vulnerabilities in users.php)
#    - Complexity scoring
#    - Migration roadmap

# 3. Select transformation target (TypeScript)
# 4. View side-by-side comparison
# 5. Download modernized code
```

## Notes

- These files contain intentional security issues and outdated patterns
- Perfect for demonstrating the transformation capabilities
- Users.php especially shows dramatic security improvements post-transformation
- All transformations maintain the original business logic while modernizing the implementation

## For Judges

These samples demonstrate:
✅ Real legacy code patterns from the 80s-2000s
✅ Common security vulnerabilities in old code
✅ Dramatic before/after transformations
✅ CodePhoenix's ability to handle multiple languages
✅ Security improvements through modernization
