function analyzeSequence() {
    let sequence = document.getElementById("sequenceInput").value.toUpperCase();
    let formattedHTML = "";

    let counts = { A: 0, T: 0, U: 0, C: 0, G: 0 };
    
    // Check if valid DNA or RNA
    let isRNA = /^[AUCG]+$/.test(sequence);
    let isDNA = /^[ATCG]+$/.test(sequence);
    
    if (!isRNA && !isDNA) {
        document.getElementById("sequenceType").innerText = "Invalid Sequence! Enter only A, T, G, C for DNA or A, U, G, C for RNA.";
        document.getElementById("formattedSequence").innerHTML = "";
        if (window.myChart) window.myChart.destroy(); // Remove chart if invalid
        return;
    }

    let sequenceType = isRNA ? "RNA Sequence Detected" : "DNA Sequence Detected";
    document.getElementById("sequenceType").innerText = sequenceType;

    // Count nucleotides & apply styling
    for (let char of sequence) {
        counts[char]++;
        formattedHTML += `<span class="highlight-${char}">${char}</span> `;
    }

    document.getElementById("formattedSequence").innerHTML = formattedHTML;
    updateChart(counts, sequenceType);
}

// Chart Visualization
function updateChart(counts, sequenceType) {
    const ctx = document.getElementById("nucleotideChart").getContext("2d");
    if (window.myChart) window.myChart.destroy(); // Clear previous chart

    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["A", "T", "U", "C", "G"],
            datasets: [{
                label: sequenceType,
                data: [counts.A, counts.T, counts.U, counts.C, counts.G],
                backgroundColor: ["#e63946", "#457b9d", "#1d3557", "#2a9d8f", "#f4a261"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: "top" }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50, // Limit to 50 nucleotides
                    ticks: {
                        stepSize: 5 // Show intervals of 5
                    }
                }
            }
        }
    });
}
