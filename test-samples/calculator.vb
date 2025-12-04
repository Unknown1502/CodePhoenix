Option Explicit

Private Sub Form_Load()
    ' Initialize calculator on form load
    Me.Caption = "Legacy Calculator v1.0"
    lblResult.Caption = "0.00"
    cboOperation.AddItem "Add"
    cboOperation.AddItem "Subtract"
    cboOperation.AddItem "Multiply"
    cboOperation.AddItem "Divide"
    cboOperation.ListIndex = 0
End Sub

Private Sub btnCalculate_Click()
    Dim num1 As Double
    Dim num2 As Double
    Dim result As Double
    Dim operation As String
    
    On Error GoTo ErrorHandler
    
    ' Get input values
    num1 = Val(txtNum1.Text)
    num2 = Val(txtNum2.Text)
    operation = cboOperation.Text
    
    ' Perform calculation based on operation
    Select Case operation
        Case "Add"
            result = num1 + num2
            lblOperation.Caption = "+"
            
        Case "Subtract"
            result = num1 - num2
            lblOperation.Caption = "-"
            
        Case "Multiply"
            result = num1 * num2
            lblOperation.Caption = "×"
            
        Case "Divide"
            If num2 <> 0 Then
                result = num1 / num2
                lblOperation.Caption = "÷"
            Else
                MsgBox "Cannot divide by zero!", vbCritical, "Error"
                txtNum2.SetFocus
                Exit Sub
            End If
            
        Case Else
            MsgBox "Invalid operation selected!", vbExclamation, "Warning"
            Exit Sub
    End Select
    
    ' Display result with formatting
    lblResult.Caption = "Result: " & Format(result, "0.00")
    lblResult.ForeColor = vbBlue
    
    Exit Sub
    
ErrorHandler:
    MsgBox "Error occurred: " & Err.Description, vbCritical, "Calculation Error"
    lblResult.Caption = "ERROR"
    lblResult.ForeColor = vbRed
End Sub

Private Sub btnClear_Click()
    ' Clear all inputs
    txtNum1.Text = ""
    txtNum2.Text = ""
    lblResult.Caption = "0.00"
    lblResult.ForeColor = vbBlack
    lblOperation.Caption = ""
    txtNum1.SetFocus
End Sub

Private Sub btnExit_Click()
    ' Confirm before exit
    If MsgBox("Are you sure you want to exit?", vbYesNo + vbQuestion, "Confirm Exit") = vbYes Then
        End
    End If
End Sub
