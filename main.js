const canvas = document.getElementById('canvas');

const gl = canvas.getContext('webgl')

// Vertex shader program
//This is where we have the attributes for storing vertex positions and the depth information for each vertex

const vertexShaderSource = `
    attribute vec4 a_Position;
    attribute float a_Depth;
    varying float v_Depth;
    
    void main() {
        gl_Position = a_Position; // Set the position of the vertex
        v_Depth = a_Depth;        // Pass the depth to the fragment shader
    }
`;

//Fragment shader program
//This is where we specify the precision for float types and receive the depth value from the vertex shader

const fragmentShaderSource = `
    precision mediump float;
    varying float v_Depth;

// setting the fragment's color based on the depth. So the closer fragment will be lighter and the further one darker. 
// The depth is shown in the RGB which creates a grayscale effect

    void main() {
        gl_FragColor = vec4(v_Depth, v_Depth, v_Depth, 1.0);
    }
`;

//Function to compile the shader from source code

function compileShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
  
    return shader;
}

//Compile both the shaders

const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

//Create the shader program. Done by attaching and linking the shaders

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

//Use the combined shader program

gl.useProgram(program);

// Define vertices for the two squares with x, y, and depth

const vertices = new Float32Array([

    // This is our first square

    -0.7,  0.7,  0.5,  // top left
    -0.7, -0.7,  0.5,  // bottom left
     0.0,  0.7,  0.5,  // top right
     0.0, -0.7,  0.5,  // bottomright

    // second square
    // same order of sides

    -0.3,  0.3,  0.7,
    -0.3, -1.0,  0.7,
     0.3,  0.3,  0.7,
     0.3, -1.0,  0.7 
]);

// Byte size of one vertex
const FSIZE = vertices.BYTES_PER_ELEMENT;

// Create a buffer and binds it to the array buffer

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Get the location of the a_Position attribute variable from the shader program

const position = gl.getAttribLocation(program, 'a_Position');

// Assign the buffer object to `a_Position` and enable

gl.vertexAttribPointer(position, 2, gl.FLOAT, false, FSIZE * 3, 0);
gl.enableVertexAttribArray(position);

// Get the location of the a_Depth attribute variable

const depth = gl.getAttribLocation(program, 'a_Depth');

// Assign the buffer object to a_Depth and enable it

gl.vertexAttribPointer(depth, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
gl.enableVertexAttribArray(depth);

// Enable the depth testing. This makes sure the cloer fragment blocks the further ones

gl.enable(gl.DEPTH_TEST);

// Set clear color to black and clear the color buffer and depth buffer

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// Draw the squares
// We draw the first square using 0 to 3 vertices
// We draw the second square using 4 to 7 vertices

gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4);