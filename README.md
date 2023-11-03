# webgl-depth-shading
A minimalist example of using WebGL to create depth.

**Features**
- Custom shader implementation.
- Vertex shading: Incorporates a custom vertex shader that calculates the position of each vertex and its depth information, creating a 3D visual effect on 2D shapes.
- Fragment shading: Uses a fragment shader that adjusts the color intensity based on the depth information, giving a grayscale gradient that signifies the distance of each fragment.
- Depth testing: Uses WebGL depth testing to make sure that the geometric shapes closer to the viewer overlap those that are further away. 
