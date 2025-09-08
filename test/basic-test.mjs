#!/usr/bin/env node

/**
 * Basic libxml2.wasm functionality test
 * Minimal test for CI/CD when full test suite not yet available
 */

import { readFileSync } from 'fs';

console.log('🧪 Basic libxml2.wasm functionality test');

try {
    // Test WASM file exists and is valid
    const wasmBuffer = readFileSync('./dist/libxml2.wasm');
    console.log(`✅ WASM binary loaded: ${wasmBuffer.length} bytes`);
    
    // Check WASM magic number
    const magicNumber = wasmBuffer.slice(0, 4);
    const expectedMagic = Buffer.from([0x00, 0x61, 0x73, 0x6d]); // "\0asm"
    
    if (magicNumber.equals(expectedMagic)) {
        console.log('✅ WASM binary has valid magic number');
    } else {
        console.error('❌ Invalid WASM magic number');
        process.exit(1);
    }
    
    // Test JavaScript module exists and loads
    const moduleImport = await import('./dist/libxml2.js');
    console.log('✅ JavaScript module loadable');
    
    console.log('✅ Basic functionality test passed');
    console.log('📊 Ready for comprehensive testing with full test suite');
    
} catch (error) {
    console.error('❌ Basic test failed:', error.message);
    process.exit(1);
}