/**
 * @author MoPuSam
 *
 * Simple test shader
 */

THREE.CartoonShader = {

    uniforms: {
    },

    vertexShader: [
        // Uniforms
        "uniform mat4 world;",
        "uniform mat4 worldViewProjection;",

        // Varying
        "varying vec3 vPos;",
        "varying vec3 vNormal;",
        "varying vec2 vUV;",

        "void main(void) {",
            "gl_Position = projectionMatrix * vec4(position, 1.0);",

            "vUV = uv;",
            "vPos = vec3(world * vec4(position, 1.0));",
            "vNormal = normalize(vec3(world * vec4(normal, 1.0)));",
        "}",

    ].join( "\n" ),

    fragmentShader: [
    // Lights
    "varying vec3 vPos;",
    "varying vec3 vNormal;",
    "varying vec2 vUV;",

    // Refs
    "uniform sampler2D textureSampler;",

    "void main(void) {",
        "float celShadingThreshold[4];",
        "celShadingThreshold[0] = 0.02;",
        "celShadingThreshold[1] = 0.1;",
        "celShadingThreshold[2] = 0.6;",
        "celShadingThreshold[3] = 0.9;",
        "float celShadingVal[5];",
        "celShadingVal[0] = 0.1;",
        "celShadingVal[1] = 0.5;",
        "celShadingVal[2] = 0.87;",
        "celShadingVal[3] = 0.95;",
        "celShadingVal[4] = 1.0;",

        "vec3 lightPos = vec3(0, 5, 20);",
        "vec3 lightDir = normalize(lightPos - vPos);",

        "float angle = dot(lightDir, vNormal);",
        "vec3 color = texture2D(textureSampler, vUV).rgb;",
        "if (angle < celShadingThreshold[0])",
        "{",
            "color = color * celShadingVal[0];",
        "}",
        "else if (angle < celShadingThreshold[1])",
        "{",
            "color = color * celShadingVal[1];",
        "}",
        "else if (angle < celShadingThreshold[2])",
        "{",
            "color = color * celShadingVal[2];",
        "}",
        "else if (angle < celShadingThreshold[3])",
        "{",
            "color = color * celShadingVal[3];",
        "}",
        "else",
        "{",
            "color = color * celShadingVal[4];",
        "}",
        "gl_FragColor = vec4(color, 1.0);",
    "}",


    ].join( "\n" )

};
