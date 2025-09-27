project('libxml2.wasm', 'c', version: '2.12.7', meson_version: '>=1.3.0', default_options: ['buildtype=release'])

fs = import('fs')

if get_option('simd')
  add_project_arguments('-msimd128', language: 'c')
endif

incs = include_directories('.')
core_sources = []
# Root C sources excluding tests/bench/tools/python and other non-core dirs
core_sources += fs.glob('*.c', exclude: ['test/**', 'tests/**', 'bench/**', 'python/**', 'fuzz/**', 'example*/**', 'debug/**', 'codegen/**'])

core = static_library('libxml2_core', core_sources, include_directories: incs)

if get_option('main_module')
  executable('libxml2-main', 'src/libxml2_wasm_module.c',
    link_with: core,
    include_directories: incs,
    install: true,
    link_args: [
      '--no-entry',
      '-sMODULARIZE=1',
      '-sEXPORT_ES6=1',
      '-sALLOW_MEMORY_GROWTH=1',
      '-sENVIRONMENT=web,webview,worker',
      '-sNO_FILESYSTEM=1',
      '-sEXPORTED_RUNTIME_METHODS=["cwrap","ccall","UTF8ToString"]',
      '-sEXPORTED_FUNCTIONS=@' + meson.project_source_root() / get_option('exports'),
    ])
endif

if get_option('side_module')
  shared_module('libxml2-side', 'src/libxml2_wasm_side.c',
    link_whole: core,
    include_directories: incs,
    install: true,
    link_args: ['-sSIDE_MODULE=2', '-fPIC'])
endif

