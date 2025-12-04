# Code Transformation Steering Guide

## General Principles

### 1. Preserve Business Logic at All Costs
- Never change the core algorithm or business rules
- Maintain exact data transformations
- Keep calculation formulas identical
- Preserve validation logic

### 2. Modernize Architecture Patterns
- Convert procedural to object-oriented/functional
- Replace goto with structured control flow
- Refactor global variables to proper scope
- Use modern dependency injection

### 3. Follow Target Language Best Practices
- Use idiomatic patterns for the target language
- Follow official style guides
- Leverage modern language features
- Use established frameworks

### 4. Add Robust Error Handling
- Replace error codes with exceptions
- Add try-catch blocks
- Implement proper logging
- Include meaningful error messages

---

## Language-Specific Transformation Rules

## COBOL → TypeScript

### Division Mapping
```
IDENTIFICATION DIVISION → Module exports
DATA DIVISION → Type definitions + Constants
PROCEDURE DIVISION → Functions/Methods
```

### Data Type Conversion
```cobol
COBOL PICTURE              TypeScript Type
---------------------------------------------
PIC 9(5)                  → number
PIC X(20)                 → string
PIC 9(5)V99               → number (decimal)
PIC S9(5)                 → number (signed)
PIC A(10)                 → string
```

### Control Structure Mapping
```cobol
PERFORM paragraph-name    → function call
PERFORM UNTIL condition   → while (condition)
PERFORM VARYING           → for loop
IF...ELSE...END-IF       → if...else
EVALUATE                  → switch statement
GO TO                     → Refactor to structured flow
```

### Example Transformation
```cobol
BEFORE (COBOL):
IDENTIFICATION DIVISION.
PROGRAM-ID. CALCULATE-TAX.

DATA DIVISION.
WORKING-STORAGE SECTION.
01 INCOME PIC 9(8)V99.
01 TAX-RATE PIC 9V99 VALUE 0.20.
01 TAX-AMOUNT PIC 9(8)V99.

PROCEDURE DIVISION.
    COMPUTE TAX-AMOUNT = INCOME * TAX-RATE.
    DISPLAY "Tax: " TAX-AMOUNT.
    STOP RUN.
```

```typescript
AFTER (TypeScript):
// calculate-tax.ts
interface TaxCalculation {
  income: number;
  taxRate: number;
  taxAmount: number;
}

export function calculateTax(income: number): TaxCalculation {
  const TAX_RATE = 0.20;
  const taxAmount = income * TAX_RATE;
  
  console.log(`Tax: $${taxAmount.toFixed(2)}`);
  
  return {
    income,
    taxRate: TAX_RATE,
    taxAmount
  };
}
```

---

## Visual Basic 6 → React

### Form to Component Mapping
```vb
VB6 Form                   React Component
---------------------------------------------
Form1.frm                → Form1.tsx
Command Button           → <button>
Text Box                 → <input type="text">
Label                    → <label> or <span>
List Box                 → <select> or <ul>
Timer                    → useEffect + setInterval
```

### Event Handling
```vb
VB6: Private Sub btnSubmit_Click()
     → React: const handleSubmit = () => {}

VB6: Private Sub Form_Load()
     → React: useEffect(() => {}, [])

VB6: Private Sub txtName_Change()
     → React: onChange={handleNameChange}
```

### State Management
```vb
VB6: Dim userName As String
     → React: const [userName, setUserName] = useState('')

VB6: Public userName As String (module-level)
     → React: Context or Redux
```

### Example Transformation
```vb
BEFORE (VB6):
Private Sub Form_Load()
    txtName.Text = ""
    lblGreeting.Caption = "Hello"
End Sub

Private Sub btnSubmit_Click()
    Dim name As String
    name = txtName.Text
    If Len(name) > 0 Then
        lblGreeting.Caption = "Hello, " & name
    Else
        MsgBox "Please enter a name", vbExclamation
    End If
End Sub
```

```tsx
AFTER (React):
import { useState } from 'react';

export default function GreetingForm() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('Hello');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().length > 0) {
      setGreeting(`Hello, ${name}`);
    } else {
      alert('Please enter a name');
    }
  };

  return (
    <div className="greeting-form">
      <h1>{greeting}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

---

## Old PHP → Next.js

### File Structure Migration
```php
PHP                        Next.js
---------------------------------------------
index.php                → app/page.tsx
about.php                → app/about/page.tsx
api/users.php            → app/api/users/route.ts
includes/header.php      → components/Header.tsx
```

### Database Access
```php
BEFORE (PHP):
$conn = mysqli_connect("localhost", "user", "pass", "db");
$query = "SELECT * FROM users WHERE id = $id";
$result = mysqli_query($conn, $query);
$user = mysqli_fetch_assoc($result);
```

```typescript
AFTER (Next.js + Prisma):
import { prisma } from '@/lib/prisma';

const user = await prisma.user.findUnique({
  where: { id: userId }
});
```

### Session Management
```php
BEFORE (PHP):
session_start();
$_SESSION['user_id'] = $user_id;
```

```typescript
AFTER (Next.js):
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId }, process.env.JWT_SECRET!);
cookies().set('auth-token', token, { httpOnly: true });
```

### Form Handling
```php
BEFORE (PHP):
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    // Process form
}
```

```typescript
AFTER (Next.js Server Action):
'use server'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // Process form
  return { success: true };
}
```

---

## Fortran → Python

### Data Type Mapping
```fortran
FORTRAN                    Python
---------------------------------------------
INTEGER                  → int
REAL                     → float
DOUBLE PRECISION         → float
CHARACTER                → str
LOGICAL                  → bool
COMPLEX                  → complex
```

### Array Handling
```fortran
BEFORE (Fortran):
REAL, DIMENSION(100) :: arr
DO i = 1, 100
    arr(i) = i * 2.0
END DO
```

```python
AFTER (Python + NumPy):
import numpy as np

arr = np.arange(1, 101) * 2.0
# Or with list comprehension:
arr = [i * 2.0 for i in range(1, 101)]
```

### Subroutine to Function
```fortran
BEFORE (Fortran):
SUBROUTINE MATRIX_MULT(A, B, C, N)
    REAL :: A(N,N), B(N,N), C(N,N)
    INTEGER :: N, i, j, k
    
    DO i = 1, N
        DO j = 1, N
            C(i,j) = 0.0
            DO k = 1, N
                C(i,j) = C(i,j) + A(i,k) * B(k,j)
            END DO
        END DO
    END DO
END SUBROUTINE
```

```python
AFTER (Python):
import numpy as np

def matrix_mult(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    """
    Multiply two matrices using NumPy.
    
    Args:
        a: First matrix
        b: Second matrix
    
    Returns:
        Resulting matrix C = A × B
    """
    return np.matmul(a, b)
    
# Or manual implementation:
def matrix_mult_manual(a: list[list[float]], 
                       b: list[list[float]]) -> list[list[float]]:
    n = len(a)
    c = [[0.0] * n for _ in range(n)]
    
    for i in range(n):
        for j in range(n):
            for k in range(n):
                c[i][j] += a[i][k] * b[k][j]
    
    return c
```

---

## Code Quality Standards

### 1. Naming Conventions
```typescript
// Bad (legacy style)
dim strUserName as string
let intCounter = 0

// Good (modern style)
let userName: string
let counter: number
```

### 2. Error Handling
```typescript
// Bad (error codes)
function doSomething(): number {
  if (error) return -1
  return 0
}

// Good (exceptions)
function doSomething(): void {
  if (error) {
    throw new Error('Something went wrong')
  }
  // Success
}
```

### 3. Documentation
```typescript
/**
 * Calculates the tax amount based on income.
 * 
 * Preserves original COBOL business logic from CALCULATE-TAX program.
 * 
 * @param income - The taxable income amount
 * @returns Tax calculation details
 * 
 * @example
 * ```typescript
 * const result = calculateTax(50000);
 * console.log(result.taxAmount); // 10000
 * ```
 */
export function calculateTax(income: number): TaxCalculation {
  // Implementation
}
```

### 4. Type Safety
```typescript
// Bad (any types)
function processData(data: any): any {
  return data.value
}

// Good (specific types)
interface InputData {
  value: number;
  label: string;
}

function processData(data: InputData): number {
  return data.value
}
```

---

## Testing Strategy

### Generate Tests for Transformed Code
```typescript
// For every transformed function, generate tests
import { describe, it, expect } from '@jest/globals';
import { calculateTax } from './calculate-tax';

describe('calculateTax', () => {
  it('should calculate tax at 20% rate', () => {
    const result = calculateTax(50000);
    expect(result.taxAmount).toBe(10000);
  });

  it('should handle zero income', () => {
    const result = calculateTax(0);
    expect(result.taxAmount).toBe(0);
  });

  it('should handle decimal income', () => {
    const result = calculateTax(50000.50);
    expect(result.taxAmount).toBeCloseTo(10000.10, 2);
  });
});
```

---

## Performance Optimization Guidelines

### 1. Replace Inefficient Patterns
```typescript
// Legacy: Nested loops for finding items
for (let i = 0; i < items.length; i++) {
  for (let j = 0; j < categories.length; j++) {
    if (items[i].category === categories[j].id) {
      // Match found
    }
  }
}

// Modern: Use Map for O(1) lookup
const categoryMap = new Map(
  categories.map(c => [c.id, c])
);

for (const item of items) {
  const category = categoryMap.get(item.category);
  // Direct access
}
```

### 2. Batch Database Operations
```typescript
// Legacy: N+1 queries
for (const userId of userIds) {
  const user = await db.getUser(userId);
  processUser(user);
}

// Modern: Single query
const users = await db.getUsers(userIds);
users.forEach(processUser);
```

---

## Migration Comments

### Add Transformation Notes
```typescript
/**
 * MIGRATION NOTE:
 * Original COBOL code used PERFORM VARYING for iteration.
 * Converted to modern for-loop while preserving iteration logic.
 * 
 * Legacy reference: CALCULATE-TAX.cbl lines 45-52
 */
for (let i = 0; i < items.length; i++) {
  // Converted logic
}
```

### Flag Manual Review Items
```typescript
// TODO: MANUAL REVIEW REQUIRED
// Original code used GO TO statements creating complex control flow.
// This has been refactored to structured if-else, but business logic
// should be verified against original PROCEDURE DIVISION.
```
