# PR #3: Add Data Visualization Components to UI Package

**Author:** frontend-dev  
**Experience:** 1.5 years React, focusing on UI components
**Branch:** feature/chart-components → main

## Description
Added reusable chart components to our shared UI package. These can be used across all our apps for consistent data visualization.

## Components Added
- BarChart - for categorical data
- PieChart - for proportional data  
- LineChart - for time series data

## Usage
```typescript
import { BarChart, PieChart, LineChart } from '@repo/ui';