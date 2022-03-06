let sigil_canvas = document.getElementById("sigil-canvas");
let a_button = document.querySelector("a");
a_button.style.visibility = "hidden";

shuffle_arr = (arr) => {
    return arr.sort( ()=>Math.random()-0.5 );
}

download_sigil = () => {
    let downloadURL = sigil_canvas.toDataURL();
    a_button.style.visibility = "visible";
    a_button.href = downloadURL;
    a_button.download = "sigil.png";
}

grid_3x3 = (affirmation, coordinates_3x3) => {
    let no_grid_lst = shuffle_arr([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let affirmation_num_arr = [];
    for(let i=0;i<affirmation.length;i++) {
        if(!affirmation_num_arr.includes(affirmation[i]) && affirmation[i] != ' ') {
            affirmation_num_arr.push(affirmation[i]);
        }
    }

    let char_a = "a";
    for(let i=0;i<affirmation_num_arr.length;i++) {
        affirmation_num_arr[i] = (affirmation_num_arr[i].charCodeAt(0) - char_a.charCodeAt(0) + 1) % 9;
        if(affirmation_num_arr[i] == 0) {
            affirmation_num_arr[i] = 9
        }
    }

    let affirmation_coordinates = [];
    for(let i=0;i<affirmation_num_arr.length;i++) {
        affirmation_coordinates.push(coordinates_3x3[no_grid_lst.indexOf(affirmation_num_arr[i])]);
    }

    return affirmation_coordinates;
}

grid_5x5 = (affirmation, coordinates_5x5) => {
    let no_grid_lst = shuffle_arr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
    let affirmation_num_arr = []
    for(let i=0;i<affirmation.length;i++) {
        if(!affirmation_num_arr.includes(affirmation[i]) && affirmation[i] != ' ') {
            affirmation_num_arr.push(affirmation[i]);
        }
    }
    console.log(affirmation_num_arr);

    let char_a = "a";
    for(let i=0;i<affirmation_num_arr.length;i++) {
        affirmation_num_arr[i] = (affirmation_num_arr[i].charCodeAt(0) - char_a.charCodeAt(0) + 1) % 25;
        if(affirmation_num_arr[i] == 0) {
            affirmation_num_arr[i] = 25
        }
    }
    console.log(affirmation_num_arr);

    let affirmation_coordinates = [];
    for(let i=0;i<affirmation_num_arr.length;i++) {
        affirmation_coordinates.push(coordinates_5x5[no_grid_lst.indexOf(affirmation_num_arr[i])]);
    }
    console.log(affirmation_coordinates);

    return affirmation_coordinates;
}

draw_sigil = (affirmation_coordinates) => {
    let ctx = sigil_canvas.getContext("2d");
    ctx.clearRect(0, 0, sigil_canvas.width, sigil_canvas.height);
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, sigil_canvas.width, sigil_canvas.height);
    ctx.beginPath();
    for(let i=0;i<affirmation_coordinates.length;i++) {
        if(i==0) {
            ctx.moveTo(affirmation_coordinates[i][0], affirmation_coordinates[i][1]);
        }
        else {
            ctx.lineTo(affirmation_coordinates[i][0], affirmation_coordinates[i][1]);
        }
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();
    }
}


draw_affirmation_sigil = () => {
    let affirmation = document.getElementById("affirmation").value.toLowerCase();

    let grid = document.getElementsByName("grid");
    let grid_selected;
    for(let i=0;i<grid.length;i++) {
        if(grid[i].checked) {
            grid_selected = grid[i].value;
        }
    }

    let coordinates_3x3 = [[120, 120], [120, 240], [120, 360],
                            [240, 120], [240, 240], [240, 360],
                            [360, 120], [360, 240], [360, 360],];
    let coordinates_5x5 = [[80, 80], [80, 160], [80, 240], [80, 360], [80, 400],
                            [160, 80], [160, 160], [160, 240], [160, 360], [160, 400],
                            [240, 80], [240, 160], [240, 240], [240, 360], [240, 400],
                            [360, 80], [360, 160], [360, 240], [360, 360], [360, 400],
                            [400, 80], [400, 160], [400, 240], [400, 360], [400, 400]];

    if(grid_selected == "grid3") {
        aff_coord_3x3 = grid_3x3(affirmation, coordinates_3x3);
        draw_sigil(aff_coord_3x3);
    }
    else if(grid_selected == "grid5") {
        aff_coord_5x5 = grid_5x5(affirmation, coordinates_5x5);
        draw_sigil(aff_coord_5x5);
    }
    download_sigil();
}