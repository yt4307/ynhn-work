<?php

use PhpCsFixer\Config;
use PhpCsFixer\Finder;

$finder = Finder::create()
    ->in(__DIR__)            // 수정할 파일의 디렉토리 지정
    ->exclude("vendor");     // vendor 폴더는 제외

return (new Config())
    ->setRules([
        // 표기 스타일 설정
        "array_syntax"                   => ["syntax" => "short"], // 배열 문법을 짧은 형태로 사용
        "binary_operator_spaces"         => ["default" => "at_least_single_space"], // 이항 연산자 사이 공백 유지
        "blank_line_after_opening_tag"   => true, // PHP 오프닝 태그 이후 빈 줄
        "blank_line_between_import_groups" => true, // import 그룹 사이에 빈 줄
        "blank_lines_before_namespace"   => true, // 네임스페이스 선언 전 빈 줄
        "braces"                         => [
            "position_after_functions_and_oop_constructs" => "same",
            "position_after_control_structures"           => "same",
            "position_after_anonymous_constructs"         => "same",
        ], // K&R 스타일 중괄호 정렬

        // 클래스 관련
        "class_definition" => [
            "inline_constructor_arguments" => false,
            "space_before_parenthesis"     => true,
        ],
        "ordered_class_elements" => [
            "order" => ["use_trait"],
        ],
        "single_trait_insert_per_statement" => true,
        "visibility_required" => true, // 모든 속성과 메서드에 가시성 명시

        // 타입/캐스팅
        "compact_nullable_type_declaration" => true,
        "lowercase_cast"                    => true,
        "return_type_declaration"           => true,
        "short_scalar_cast"                 => true,

        // new 및 static 관련
        "lowercase_static_reference" => true,
        "new_with_parentheses"       => true,

        // 불필요한 코드 제거
        "no_unused_imports"             => true,
        "no_blank_lines_after_class_opening" => true,
        "no_extra_blank_lines"         => ["tokens" => ["use"]],
        "no_leading_import_slash"      => true,
        "no_whitespace_in_blank_line"  => true,

        // import 정렬
        "ordered_imports" => [
            "imports_order"  => ["class", "function", "const"],
            "sort_algorithm" => "none",
        ],
        "single_import_per_statement" => ["group_to_single_imports" => false],

        // 공백/줄바꿈
        "single_space_around_construct" => [
            "constructs_followed_by_a_single_space" => [
                "abstract", "as", "case", "catch", "class", "const_import", "do", "else", "elseif", "final", "finally",
                "for", "foreach", "function", "function_import", "if", "insteadof", "interface", "namespace", "new",
                "private", "protected", "public", "static", "switch", "trait", "try", "use", "use_lambda", "while"
            ],
            "constructs_preceded_by_a_single_space" => ["as", "else", "elseif", "use_lambda"]
        ],
        "ternary_operator_spaces"     => true,
        "unary_operator_spaces"       => ["only_dec_inc" => true],

        // 문자열 연결
        "concat_space" => ["spacing" => "one"], // 문자열 연결 시 "a" . "b" 형태로 공백 유지
    ])
    ->setFinder($finder)
    ->setUsingCache(true);
