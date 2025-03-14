# Calculator

## Description
This repository calculates the migration efficiency given the source and migrated code outputs. It provides a detailed report that highlights the portions of inputs and the corresponding percentage of migration at various levels including folder, file, filetype, class, function, objects, variables, lines, conditions, and blocks.

## Features
- Calculates migration efficiency
- Generates a detailed report
- Highlights migration at multiple levels:
  - Folder
  - File
  - Filetype
  - Class
  - Function
  - Objects
  - Variables
  - Lines
  - Conditions
  - Blocks

## Efficiency Calculation
100% efficiency is achieved when:
- All the functionality is fully migrated
- The migrated code is compilable and runs without any errors

## Usage
1. Provide the source and migrated code outputs.
2. Run the efficiency calculator.
3. Review the detailed migration report.

## Installation
To install the necessary dependencies, run:
```bash
npm install
# or if using Python
pip install -r requirements.txt

#Running the Calculator
node index.js
# or if using Python
python calculator.py
