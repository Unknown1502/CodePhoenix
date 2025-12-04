import { NextRequest, NextResponse } from 'next/server'
import { MOCK_TRANSFORMATIONS } from '@/lib/mockData'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, filename, targetLanguage, legacyCode } = await request.json()

    if (!sessionId || !filename || !targetLanguage || !legacyCode) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Detect source language
    const sourceLanguage = detectLanguage(filename)
    const langKey = sourceLanguage.toLowerCase().replace(/[^a-z0-9]/g, '')

    // Use mock transformation data
    const mockData = (MOCK_TRANSFORMATIONS as any)[langKey] || MOCK_TRANSFORMATIONS.cobol
    
    // Generate code based on target language
    const transformedCode = generateTransformedCode(mockData, targetLanguage, sourceLanguage)

    return NextResponse.json({
      success: true,
      sessionId,
      filename,
      sourceLanguage,
      targetLanguage,
      legacyCode,
      transformedCode,
      stats: {
        originalLines: legacyCode.split('\n').length,
        transformedLines: transformedCode.split('\n').length,
        codeReduction: Math.round(((legacyCode.length - transformedCode.length) / legacyCode.length) * 100),
      },
    })
  } catch (error) {
    console.error('Transform error:', error)
    return NextResponse.json(
      { error: 'Transformation failed' },
      { status: 500 }
    )
  }
}

function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  const languageMap: { [key: string]: string } = {
    // Mainframe & Legacy Business
    'cbl': 'COBOL',
    'cob': 'COBOL',
    'rpg': 'RPG',
    'rpgle': 'RPG IV',
    'jcl': 'JCL',
    'pli': 'PL/I',
    'pl1': 'PL/I',
    
    // Desktop & Client-Server Era
    'vb': 'Visual Basic 6',
    'bas': 'Visual Basic',
    'frm': 'Visual Basic Forms',
    'cls': 'VB Class',
    'pb': 'PowerBuilder',
    'prw': 'AdvPL (Protheus)',
    'dpr': 'Delphi',
    'dfm': 'Delphi Form',
    
    // Database Languages
    'prg': 'Clipper/dBASE',
    'dbf': 'dBASE',
    'fmb': 'Oracle Forms',
    'mmb': 'Oracle Menu',
    'pll': 'Oracle PL/SQL Library',
    
    // Scientific & Engineering
    'for': 'Fortran 77',
    'f': 'Fortran',
    'f90': 'Fortran 90',
    'f95': 'Fortran 95',
    'ada': 'Ada',
    'adb': 'Ada Body',
    'ads': 'Ada Spec',
    'apl': 'APL',
    
    // Web Legacy
    'php': 'PHP 5.x',
    'php3': 'PHP 3',
    'php4': 'PHP 4',
    'asp': 'Classic ASP',
    'cfm': 'ColdFusion',
    'cfc': 'ColdFusion Component',
    'jsp': 'JSP',
    
    // Scripting Legacy
    'pl': 'Perl',
    'pm': 'Perl Module',
    'tcl': 'Tcl',
    'awk': 'AWK',
    'sed': 'SED',
    
    // Systems & Low Level
    'asm': 'Assembly',
    's': 'Assembly',
    'pas': 'Pascal',
    'pp': 'Pascal',
    'mod': 'Modula-2',
    'def': 'Modula-2 Definition',
    
    // Other Dead Languages
    'alg': 'ALGOL',
    'sim': 'Simula',
    'sno': 'SNOBOL',
    'lsp': 'Lisp',
    'scm': 'Scheme',
    'logo': 'Logo',
    'rex': 'REXX',
  }

  return languageMap[ext || ''] || 'Unknown'
}

function generateTransformedCode(mockData: any, targetLanguage: string, sourceLanguage: string): string {
  // If target is TypeScript, use the default transformation
  if (targetLanguage === 'TypeScript') {
    return mockData.transformed
  }

  // Generate appropriate code based on target language
  const baseComment = `// Modernized from ${sourceLanguage} to ${targetLanguage}`
  
  if (targetLanguage === 'React') {
    return `import React, { useState, useEffect } from 'react';

${baseComment}

interface InventorySystemProps {}

const InventorySystem: React.FC<InventorySystemProps> = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    initialization();
  }, []);

  const initialization = () => {
    setTotalValue(0);
    console.log('Inventory System Started');
  };

  const processItems = () => {
    setIsProcessing(true);
    const item = {
      itemId: 123456,
      itemName: 'Widget A',
      itemPrice: 99.99,
      itemQuantity: 100
    };

    setItems(prev => [...prev, item]);
    setTotalValue(prev => prev + item.itemPrice * item.itemQuantity);
    console.log(\`Processed: \${item.itemName}\`);
    setIsProcessing(false);
  };

  return (
    <div className="inventory-system">
      <h1>Inventory Management System</h1>
      <div className="stats">
        <p>Total Value: ` + `$` + `{totalValue.toFixed(2)}</p>
        <p>Items Processed: {items.length}</p>
      </div>
      <button onClick={processItems} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Process Item'}
      </button>
      <div className="items-list">
        {items.map((item, idx) => (
          <div key={idx} className="item">
            <span>{item.itemName}</span>
            <span>` + `$` + `{item.itemPrice}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventorySystem;`
  }

  if (targetLanguage === 'Python') {
    return `"""
${baseComment}
"""

class ItemRecord:
    def __init__(self, item_id: int, item_name: str, item_price: float, item_quantity: int):
        self.item_id = item_id
        self.item_name = item_name
        self.item_price = item_price
        self.item_quantity = item_quantity


class InventorySystem:
    def __init__(self):
        self.total_value = 0.0
        self.items = []

    def main(self):
        self.initialization()
        self.process_items()
        self.finalization()

    def initialization(self):
        self.total_value = 0.0
        print("Inventory System Started")

    def process_items(self):
        item = ItemRecord(
            item_id=123456,
            item_name="Widget A",
            item_price=99.99,
            item_quantity=100
        )
        
        self.items.append(item)
        self.total_value += item.item_price * item.item_quantity
        print(f"Processed: {item.item_name}")

    def finalization(self):
        print(f"Total Value: ` + `$` + `{self.total_value:.2f}")
        print("Inventory System Complete")


if __name__ == "__main__":
    system = InventorySystem()
    system.main()`
  }

  if (targetLanguage === 'Next.js') {
    return `'use client'

import { useState, useEffect } from 'react'

${baseComment}

interface Item {
  itemId: number
  itemName: string
  itemPrice: number
  itemQuantity: number
}

export default function InventoryPage() {
  const [totalValue, setTotalValue] = useState(0)
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    initialization()
  }, [])

  const initialization = async () => {
    setTotalValue(0)
    console.log('Inventory System Started')
  }

  const processItems = async () => {
    const item: Item = {
      itemId: 123456,
      itemName: 'Widget A',
      itemPrice: 99.99,
      itemQuantity: 100
    }

    setItems(prev => [...prev, item])
    setTotalValue(prev => prev + item.itemPrice * item.itemQuantity)
    console.log(\`Processed: \${item.itemName}\`)
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Inventory Management System</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>Total Value: ` + `$` + `{totalValue.toFixed(2)}</p>
        <p>Items: {items.length}</p>
      </div>

      <button
        onClick={processItems}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Process Item
      </button>

      <div className="mt-6 space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="border p-4 rounded">
            <p className="font-semibold">{item.itemName}</p>
            <p className="text-sm text-gray-600">
              ` + `$` + `{item.itemPrice} × {item.itemQuantity}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}`
  }

  if (targetLanguage === 'Go') {
    return `package main

import "fmt"

// ${baseComment}

type ItemRecord struct {
    ItemID       int
    ItemName     string
    ItemPrice    float64
    ItemQuantity int
}

type InventorySystem struct {
    TotalValue float64
    Items      []ItemRecord
}

func (sys *InventorySystem) Main() {
    sys.Initialization()
    sys.ProcessItems()
    sys.Finalization()
}

func (sys *InventorySystem) Initialization() {
    sys.TotalValue = 0.0
    fmt.Println("Inventory System Started")
}

func (sys *InventorySystem) ProcessItems() {
    item := ItemRecord{
        ItemID:       123456,
        ItemName:     "Widget A",
        ItemPrice:    99.99,
        ItemQuantity: 100,
    }

    sys.Items = append(sys.Items, item)
    sys.TotalValue += item.ItemPrice * float64(item.ItemQuantity)
    fmt.Printf("Processed: %s\\n", item.ItemName)
}

func (sys *InventorySystem) Finalization() {
    fmt.Printf("Total Value: ` + `$` + `%.2f\\n", sys.TotalValue)
    fmt.Println("Inventory System Complete")
}

func main() {
    system := &InventorySystem{}
    system.Main()
}`
  }

  if (targetLanguage === 'Rust') {
    return `// ${baseComment}

#[derive(Debug)]
struct ItemRecord {
    item_id: u32,
    item_name: String,
    item_price: f64,
    item_quantity: u32,
}

struct InventorySystem {
    total_value: f64,
    items: Vec<ItemRecord>,
}

impl InventorySystem {
    fn new() -> Self {
        InventorySystem {
            total_value: 0.0,
            items: Vec::new(),
        }
    }

    fn run(&mut self) {
        self.initialization();
        self.process_items();
        self.finalization();
    }

    fn initialization(&mut self) {
        self.total_value = 0.0;
        println!("Inventory System Started");
    }

    fn process_items(&mut self) {
        let item = ItemRecord {
            item_id: 123456,
            item_name: String::from("Widget A"),
            item_price: 99.99,
            item_quantity: 100,
        };

        self.total_value += item.item_price * item.item_quantity as f64;
        println!("Processed: {}", item.item_name);
        self.items.push(item);
    }

    fn finalization(&self) {
        println!("Total Value: ` + `$` + `{:.2}", self.total_value);
        println!("Inventory System Complete");
    }
}

fn main() {
    let mut system = InventorySystem::new();
    system.run();
}`
  }

  if (targetLanguage === 'Vue.js') {
    return `<template>
  <div class="inventory-system">
    <h1>Inventory Management System</h1>
    <div class="stats">
      <p>Total Value: ` + `$` + `{{ totalValue.toFixed(2) }}</p>
      <p>Items Processed: {{ items.length }}</p>
    </div>
    <button @click="processItems" :disabled="isProcessing">
      {{ isProcessing ? 'Processing...' : 'Process Item' }}
    </button>
    <div class="items-list">
      <div v-for="(item, idx) in items" :key="idx" class="item">
        <span>{{ item.itemName }}</span>
        <span>` + `$` + `{{ item.itemPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// ${baseComment}

interface Item {
  itemId: number
  itemName: string
  itemPrice: number
  itemQuantity: number
}

const totalValue = ref(0)
const items = ref<Item[]>([])
const isProcessing = ref(false)

const initialization = () => {
  totalValue.value = 0
  console.log('Inventory System Started')
}

const processItems = () => {
  isProcessing.value = true
  const item: Item = {
    itemId: 123456,
    itemName: 'Widget A',
    itemPrice: 99.99,
    itemQuantity: 100
  }

  items.value.push(item)
  totalValue.value += item.itemPrice * item.itemQuantity
  console.log(\`Processed: \${item.itemName}\`)
  isProcessing.value = false
}

onMounted(() => {
  initialization()
})
</script>

<style scoped>
.inventory-system {
  padding: 2rem;
}

.stats {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

button {
  padding: 0.5rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.items-list {
  margin-top: 1rem;
}

.item {
  padding: 0.75rem;
  border: 1px solid #ddd;
  margin: 0.5rem 0;
  border-radius: 4px;
}
</style>`
  }

  if (targetLanguage === 'Angular') {
    return `import { Component, OnInit } from '@angular/core';

// ${baseComment}

interface Item {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemQuantity: number;
}

@Component({
  selector: 'app-inventory',
  template: \`
    <div class="inventory-system">
      <h1>Inventory Management System</h1>
      <div class="stats">
        <p>Total Value: ` + `$` + `{{ totalValue.toFixed(2) }}</p>
        <p>Items Processed: {{ items.length }}</p>
      </div>
      <button (click)="processItems()" [disabled]="isProcessing">
        {{ isProcessing ? 'Processing...' : 'Process Item' }}
      </button>
      <div class="items-list">
        <div *ngFor="let item of items; let idx = index" class="item">
          <span>{{ item.itemName }}</span>
          <span>` + `$` + `{{ item.itemPrice }}</span>
        </div>
      </div>
    </div>
  \`,
  styles: [\`
    .inventory-system {
      padding: 2rem;
    }
    .stats {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
    }
    button {
      padding: 0.5rem 1.5rem;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .items-list {
      margin-top: 1rem;
    }
    .item {
      padding: 0.75rem;
      border: 1px solid #ddd;
      margin: 0.5rem 0;
      border-radius: 4px;
    }
  \`]
})
export class InventoryComponent implements OnInit {
  totalValue = 0;
  items: Item[] = [];
  isProcessing = false;

  ngOnInit(): void {
    this.initialization();
  }

  initialization(): void {
    this.totalValue = 0;
    console.log('Inventory System Started');
  }

  processItems(): void {
    this.isProcessing = true;
    const item: Item = {
      itemId: 123456,
      itemName: 'Widget A',
      itemPrice: 99.99,
      itemQuantity: 100
    };

    this.items.push(item);
    this.totalValue += item.itemPrice * item.itemQuantity;
    console.log(\`Processed: \${item.itemName}\`);
    this.isProcessing = false;
  }
}`
  }

  if (targetLanguage === 'Java') {
    return `package com.inventory;

import java.util.ArrayList;
import java.util.List;

// ${baseComment}

class ItemRecord {
    private int itemId;
    private String itemName;
    private double itemPrice;
    private int itemQuantity;

    public ItemRecord(int itemId, String itemName, double itemPrice, int itemQuantity) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemQuantity = itemQuantity;
    }

    public int getItemId() { return itemId; }
    public String getItemName() { return itemName; }
    public double getItemPrice() { return itemPrice; }
    public int getItemQuantity() { return itemQuantity; }
}

public class InventorySystem {
    private double totalValue;
    private List<ItemRecord> items;

    public InventorySystem() {
        this.totalValue = 0.0;
        this.items = new ArrayList<>();
    }

    public void run() {
        initialization();
        processItems();
        finalization();
    }

    private void initialization() {
        totalValue = 0.0;
        System.out.println("Inventory System Started");
    }

    private void processItems() {
        ItemRecord item = new ItemRecord(
            123456,
            "Widget A",
            99.99,
            100
        );

        items.add(item);
        totalValue += item.getItemPrice() * item.getItemQuantity();
        System.out.println("Processed: " + item.getItemName());
    }

    private void finalization() {
        System.out.printf("Total Value: ` + `$` + `%.2f%n", totalValue);
        System.out.println("Inventory System Complete");
    }

    public static void main(String[] args) {
        InventorySystem system = new InventorySystem();
        system.run();
    }
}`
  }

  if (targetLanguage === 'C#') {
    return `using System;
using System.Collections.Generic;

// ${baseComment}

namespace InventoryManagement
{
    public class ItemRecord
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public double ItemPrice { get; set; }
        public int ItemQuantity { get; set; }

        public ItemRecord(int itemId, string itemName, double itemPrice, int itemQuantity)
        {
            ItemId = itemId;
            ItemName = itemName;
            ItemPrice = itemPrice;
            ItemQuantity = itemQuantity;
        }
    }

    public class InventorySystem
    {
        private double totalValue;
        private List<ItemRecord> items;

        public InventorySystem()
        {
            totalValue = 0.0;
            items = new List<ItemRecord>();
        }

        public void Run()
        {
            Initialization();
            ProcessItems();
            Finalization();
        }

        private void Initialization()
        {
            totalValue = 0.0;
            Console.WriteLine("Inventory System Started");
        }

        private void ProcessItems()
        {
            var item = new ItemRecord(
                itemId: 123456,
                itemName: "Widget A",
                itemPrice: 99.99,
                itemQuantity: 100
            );

            items.Add(item);
            totalValue += item.ItemPrice * item.ItemQuantity;
            Console.WriteLine(` + `$` + `"Processed: {item.ItemName}");
        }

        private void Finalization()
        {
            Console.WriteLine(` + `$` + `"Total Value: ` + `$` + `{totalValue:F2}");
            Console.WriteLine("Inventory System Complete");
        }

        static void Main(string[] args)
        {
            var system = new InventorySystem();
            system.Run();
        }
    }
}`
  }

  if (targetLanguage === 'Kotlin') {
    return `// ${baseComment}

data class ItemRecord(
    val itemId: Int,
    val itemName: String,
    val itemPrice: Double,
    val itemQuantity: Int
)

class InventorySystem {
    private var totalValue = 0.0
    private val items = mutableListOf<ItemRecord>()

    fun run() {
        initialization()
        processItems()
        finalization()
    }

    private fun initialization() {
        totalValue = 0.0
        println("Inventory System Started")
    }

    private fun processItems() {
        val item = ItemRecord(
            itemId = 123456,
            itemName = "Widget A",
            itemPrice = 99.99,
            itemQuantity = 100
        )

        items.add(item)
        totalValue += item.itemPrice * item.itemQuantity
        println("Processed: \${item.itemName}")
    }

    private fun finalization() {
        println("Total Value: ` + `$` + `%.2f".format(totalValue))
        println("Inventory System Complete")
    }
}

fun main() {
    val system = InventorySystem()
    system.run()
}`
  }

  if (targetLanguage === 'Swift') {
    return `import Foundation

// ${baseComment}

struct ItemRecord {
    let itemId: Int
    let itemName: String
    let itemPrice: Double
    let itemQuantity: Int
}

class InventorySystem {
    private var totalValue: Double = 0.0
    private var items: [ItemRecord] = []

    func run() {
        initialization()
        processItems()
        finalization()
    }

    private func initialization() {
        totalValue = 0.0
        print("Inventory System Started")
    }

    private func processItems() {
        let item = ItemRecord(
            itemId: 123456,
            itemName: "Widget A",
            itemPrice: 99.99,
            itemQuantity: 100
        )

        items.append(item)
        totalValue += item.itemPrice * Double(item.itemQuantity)
        print("Processed: \\(item.itemName)")
    }

    private func finalization() {
        print(String(format: "Total Value: ` + `$` + `%.2f", totalValue))
        print("Inventory System Complete")
    }
}

let system = InventorySystem()
system.run()`
  }

  if (targetLanguage === 'Svelte') {
    return `<script lang="ts">
  // ${baseComment}
  
  interface Item {
    itemId: number
    itemName: string
    itemPrice: number
    itemQuantity: number
  }

  let totalValue = 0
  let items: Item[] = []
  let isProcessing = false

  function initialization() {
    totalValue = 0
    console.log('Inventory System Started')
  }

  function processItems() {
    isProcessing = true
    const item: Item = {
      itemId: 123456,
      itemName: 'Widget A',
      itemPrice: 99.99,
      itemQuantity: 100
    }

    items = [...items, item]
    totalValue += item.itemPrice * item.itemQuantity
    console.log(\`Processed: \${item.itemName}\`)
    isProcessing = false
  }

  initialization()
</script>

<div class="inventory-system">
  <h1>Inventory Management System</h1>
  <div class="stats">
    <p>Total Value: ` + `$` + `{totalValue.toFixed(2)}</p>
    <p>Items Processed: {items.length}</p>
  </div>
  <button on:click={processItems} disabled={isProcessing}>
    {isProcessing ? 'Processing...' : 'Process Item'}
  </button>
  <div class="items-list">
    {#each items as item, idx}
      <div class="item">
        <span>{item.itemName}</span>
        <span>` + `$` + `{item.itemPrice}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .inventory-system {
    padding: 2rem;
  }

  .stats {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
  }

  button {
    padding: 0.5rem 1.5rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .items-list {
    margin-top: 1rem;
  }

  .item {
    padding: 0.75rem;
    border: 1px solid #ddd;
    margin: 0.5rem 0;
    border-radius: 4px;
  }
</style>`
  }

  // Handle modern backend frameworks
  if (targetLanguage === 'FastAPI (Python)') {
    return `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn

# ${baseComment}

app = FastAPI(title="Inventory System API")

class ItemRecord(BaseModel):
    item_id: int
    item_name: str
    item_price: float
    item_quantity: int

class InventoryState:
    def __init__(self):
        self.total_value: float = 0.0
        self.items: List[ItemRecord] = []

inventory = InventoryState()

@app.on_event("startup")
async def initialization():
    inventory.total_value = 0.0
    print("Inventory System Started")

@app.post("/items/process")
async def process_items():
    item = ItemRecord(
        item_id=123456,
        item_name="Widget A",
        item_price=99.99,
        item_quantity=100
    )
    
    inventory.items.append(item)
    inventory.total_value += item.item_price * item.item_quantity
    print(f"Processed: {item.item_name}")
    
    return {
        "message": "Item processed",
        "item": item,
        "total_value": inventory.total_value
    }

@app.get("/inventory/summary")
async def get_summary():
    return {
        "total_value": inventory.total_value,
        "item_count": len(inventory.items),
        "items": inventory.items
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`
  }

  if (targetLanguage === 'Django') {
    return `from django.db import models
from django.http import JsonResponse
from django.views import View

# ${baseComment}

class ItemRecord(models.Model):
    item_id = models.IntegerField(unique=True)
    item_name = models.CharField(max_length=100)
    item_price = models.DecimalField(max_digits=10, decimal_places=2)
    item_quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'inventory_items'

    def __str__(self):
        return self.item_name

class InventoryView(View):
    def get(self, request):
        items = ItemRecord.objects.all()
        total_value = sum(item.item_price * item.item_quantity for item in items)
        
        return JsonResponse({
            'total_value': float(total_value),
            'item_count': items.count(),
            'items': list(items.values())
        })

    def post(self, request):
        item = ItemRecord.objects.create(
            item_id=123456,
            item_name="Widget A",
            item_price=99.99,
            item_quantity=100
        )
        
        print(f"Processed: {item.item_name}")
        
        return JsonResponse({
            'message': 'Item created',
            'item': {
                'id': item.id,
                'item_name': item.item_name,
                'item_price': float(item.item_price)
            }
        })`
  }

  if (targetLanguage === 'Spring Boot') {
    return `package com.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

// ${baseComment}

@SpringBootApplication
public class InventoryApplication {
    public static void main(String[] args) {
        SpringApplication.run(InventoryApplication.class, args);
        System.out.println("Inventory System Started");
    }
}

@Data
class ItemRecord {
    private int itemId;
    private String itemName;
    private double itemPrice;
    private int itemQuantity;

    public ItemRecord(int itemId, String itemName, double itemPrice, int itemQuantity) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemQuantity = itemQuantity;
    }
}

@RestController
@RequestMapping("/api/inventory")
class InventoryController {
    private double totalValue = 0.0;
    private List<ItemRecord> items = new ArrayList<>();

    @PostMapping("/process")
    public ItemRecord processItem() {
        ItemRecord item = new ItemRecord(
            123456,
            "Widget A",
            99.99,
            100
        );

        items.add(item);
        totalValue += item.getItemPrice() * item.getItemQuantity();
        System.out.println("Processed: " + item.getItemName());

        return item;
    }

    @GetMapping("/summary")
    public InventorySummary getSummary() {
        return new InventorySummary(totalValue, items.size(), items);
    }
}

@Data
class InventorySummary {
    private double totalValue;
    private int itemCount;
    private List<ItemRecord> items;

    public InventorySummary(double totalValue, int itemCount, List<ItemRecord> items) {
        this.totalValue = totalValue;
        this.itemCount = itemCount;
        this.items = items;
    }
}`
  }

  if (targetLanguage === 'Ruby on Rails') {
    return `# ${baseComment}

# app/models/item_record.rb
class ItemRecord < ApplicationRecord
  validates :item_id, presence: true, uniqueness: true
  validates :item_name, presence: true
  validates :item_price, presence: true, numericality: { greater_than: 0 }
  validates :item_quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }

  def total_price
    item_price * item_quantity
  end
end

# app/controllers/inventory_controller.rb
class InventoryController < ApplicationController
  def index
    @items = ItemRecord.all
    @total_value = @items.sum(&:total_price)

    render json: {
      total_value: @total_value,
      item_count: @items.count,
      items: @items
    }
  end

  def create
    @item = ItemRecord.new(
      item_id: 123456,
      item_name: "Widget A",
      item_price: 99.99,
      item_quantity: 100
    )

    if @item.save
      Rails.logger.info "Processed: #{@item.item_name}"
      render json: {
        message: 'Item created',
        item: @item
      }, status: :created
    else
      render json: { errors: @item.errors }, status: :unprocessable_entity
    end
  end
end

# config/routes.rb
Rails.application.routes.draw do
  resources :inventory, only: [:index, :create]
  get '/inventory/summary', to: 'inventory#index'
end`
  }

  if (targetLanguage === 'Phoenix (Elixir)') {
    return `# ${baseComment}

defmodule Inventory.ItemRecord do
  use Ecto.Schema
  import Ecto.Changeset

  schema "item_records" do
    field :item_id, :integer
    field :item_name, :string
    field :item_price, :decimal
    field :item_quantity, :integer

    timestamps()
  end

  def changeset(item_record, attrs) do
    item_record
    |> cast(attrs, [:item_id, :item_name, :item_price, :item_quantity])
    |> validate_required([:item_id, :item_name, :item_price, :item_quantity])
    |> unique_constraint(:item_id)
  end
end

defmodule InventoryWeb.InventoryController do
  use InventoryWeb, :controller
  alias Inventory.{Repo, ItemRecord}

  def index(conn, _params) do
    items = Repo.all(ItemRecord)
    total_value = Enum.reduce(items, Decimal.new(0), fn item, acc ->
      Decimal.add(acc, Decimal.mult(item.item_price, item.item_quantity))
    end)

    json(conn, %{
      total_value: total_value,
      item_count: length(items),
      items: items
    })
  end

  def create(conn, _params) do
    attrs = %{
      item_id: 123456,
      item_name: "Widget A",
      item_price: Decimal.new("99.99"),
      item_quantity: 100
    }

    case %ItemRecord{} |> ItemRecord.changeset(attrs) |> Repo.insert() do
      {:ok, item} ->
        IO.puts("Processed: #{item.item_name}")
        json(conn, %{message: "Item created", item: item})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: changeset})
    end
  end
end`
  }

  if (targetLanguage === 'ASP.NET Core') {
    return `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// ${baseComment}

namespace InventoryAPI.Models
{
    public class ItemRecord
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public decimal ItemPrice { get; set; }
        public int ItemQuantity { get; set; }

        public decimal TotalPrice => ItemPrice * ItemQuantity;
    }

    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options)
            : base(options) { }

        public DbSet<ItemRecord> Items { get; set; }
    }
}

namespace InventoryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryContext _context;

        public InventoryController(InventoryContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<ActionResult> GetSummary()
        {
            var items = await _context.Items.ToListAsync();
            var totalValue = items.Sum(i => i.TotalPrice);

            return Ok(new
            {
                totalValue,
                itemCount = items.Count,
                items
            });
        }

        [HttpPost("process")]
        public async Task<ActionResult<ItemRecord>> ProcessItem()
        {
            var item = new ItemRecord
            {
                ItemId = 123456,
                ItemName = "Widget A",
                ItemPrice = 99.99m,
                ItemQuantity = 100
            };

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            Console.WriteLine(` + `$` + `"Processed: {item.ItemName}");

            return CreatedAtAction(nameof(GetSummary), new { id = item.Id }, item);
        }
    }
}`
  }

  if (targetLanguage === 'NestJS') {
    return `import { Injectable, Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// ${baseComment}

@Entity()
export class ItemRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  itemId: number;

  @Column()
  itemName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  itemPrice: number;

  @Column()
  itemQuantity: number;
}

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(ItemRecord)
    private itemRepository: Repository<ItemRecord>,
  ) {}

  async processItem(): Promise<ItemRecord> {
    const item = this.itemRepository.create({
      itemId: 123456,
      itemName: 'Widget A',
      itemPrice: 99.99,
      itemQuantity: 100,
    });

    const saved = await this.itemRepository.save(item);
    console.log(\`Processed: \${saved.itemName}\`);
    return saved;
  }

  async getSummary() {
    const items = await this.itemRepository.find();
    const totalValue = items.reduce(
      (sum, item) => sum + item.itemPrice * item.itemQuantity,
      0
    );

    return {
      totalValue,
      itemCount: items.length,
      items,
    };
  }
}

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('summary')
  async getSummary() {
    return this.inventoryService.getSummary();
  }

  @Post('process')
  async processItem() {
    return this.inventoryService.processItem();
  }
}`
  }

  // For unmatched languages, return generic TypeScript
  return mockData.transformed
}
