// function updatePreview() {
//     document.getElementById('preview-title').innerText = document.getElementById('blog-title').value || "Live Preview";
//     document.getElementById('preview-content').innerText = document.getElementById('blog-content').value;
// }

function updatePreview() {
    document.getElementById('preview-title').innerText = document.getElementById('blog-title').value || "Live Preview";
    const previewContent = document.getElementById('preview-content');
    
    // Preserve existing images by removing only text content
    const existingImages = previewContent.querySelectorAll("img");
    
    // Clear preview but keep images
    previewContent.innerHTML = "";

    // Add back the text from textarea
    const textContent = document.createElement("p");
    textContent.innerText = document.getElementById('blog-content').value;
    previewContent.appendChild(textContent);

    // Re-add images to the preview
    existingImages.forEach(img => previewContent.appendChild(img));
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview-image');
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

function addImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Create an image element for live preview
            const myImage = document.createElement("img");
            myImage.src = e.target.result;
            myImage.style.maxWidth = "100%";
            myImage.style.marginTop = "10px";
            myImage.alt = file.name;

            // Append image to preview (not textarea)
            const preview = document.getElementById('preview-content');
            preview.appendChild(myImage);

            // Insert a reference in the textarea (Markdown format)
            const blogContent = document.getElementById('blog-content');
            blogContent.value += `\n\n![${file.name}](image_url_placeholder)\n\n`;

            // Display file name
            document.getElementById("file-name").innerText = file.name;
        };
        reader.readAsDataURL(file);
    }
}


function saveBlog() {
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;

    if (title.trim() === "" || content.trim() === "") {
        alert("Title and content cannot be empty!");
        return;
    }

    alert("Blog saved successfully! (Here, you would send it to a backend)");
}