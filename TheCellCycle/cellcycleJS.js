var currentImg = 0;
var next = document.getElementById("next");
var back = document.getElementById("back");
var phase = document.getElementById("phase");
var img = document.getElementById("img");
var description = document.getElementById("text");
var imgs = ["images/0.png", "images/1.png", "images/2.png", "images/3.png", "images/4.png", "images/4.png"];
var phases = ["Interphase", "Prophase", "Metaphase", "Anaphase", "Telophase", "Cytokinesis"];
var descriptions = ["The cell spends 90% of its life in this phase. This phase is split up into 3 subphases; Gap1, Synthesis, Gap2. G1 is the first phase, in it the cell grows and carries out normal cell functions. S phase is the second phase, in it the cell copies and replicates its DNA. In the last phase, G2, the cell continues to grow and prepares for cell division.",
"This is the first stage in cell division and mitosis. The chromosomes re-condense, the nuclear envelope disappears, centrioles move to opposite ends of the cell, and spindle fibers begin to form.",
"This is the second stage in cell division and mitosis. Sister Chromatids attach to the spindle fibers at the centromere and chromosomes line up in the middle of the cell.",
"This is the third phase of cell division and mitosis. Sister Chromatids separate and begin to move to opposite ends of the cell.",
"This is the final stage of mitosis and the fourth stage of cell division. Two new nuclei form and the cell's chromosomes uncoil into chromatin.",
"This is the last stage in cell division. Cytoplasm divides and creates a new cell (daughter cell)."];

next.addEventListener('click', function() {
    currentImg += 1;
    phase.innerHTML = phases[currentImg % 6];
    img.src = imgs[currentImg % 6];
    description.innerHTML = descriptions[currentImg % 6];
});
back.addEventListener('click', function() {
    currentImg -= 1;
    phase.innerHTML = phases[currentImg % 6];
    img.src = imgs[currentImg % 6];
    description.innerHTML = descriptions[currentImg % 6];
});