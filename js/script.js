document.addEventListener("DOMContentLoaded", function () {
    const urlInput = document.getElementById("urlInput");
    const fileInput = document.getElementById("imageInput");
    const urlList = document.getElementById("urlList");
    const messageContainer = document.getElementById("messageContainer");

    function showMessage(message, type = "success") {
        messageContainer.textContent = message;
        messageContainer.className = `message ${type}`;
        setTimeout(() => {
            messageContainer.textContent = "";
        }, 3000);
    }

    document.getElementById("urlForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const url = urlInput.value.trim();
        const file = fileInput.files[0];

        if (!url) {
            showMessage("Por favor, ingrese una URL.", "error");
            return;
        }

        const listItem = document.createElement("li");

        let imageElement = "";
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            imageElement = `<img src="${imageUrl}" alt="Imagen subida" width="50">`;
        }

        listItem.innerHTML = `
            ${imageElement}
            <a href="${url}" class="url-text" target="_blank">${url}</a>
            <div class="button-container">
                <button class="copy-btn">Copiar</button>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;

        urlList.appendChild(listItem);

        if (urlList.children.length > 3) {
            urlList.removeChild(urlList.firstElementChild);
        }

        urlInput.value = "";
        fileInput.value = "";

        showMessage("URL agregada correctamente.");
    });

    urlList.addEventListener("click", function (e) {
        if (e.target.classList.contains("copy-btn")) {
            const urlText = e.target.closest("li").querySelector(".url-text").textContent;
            navigator.clipboard.writeText(urlText).then(() => {
                showMessage("URL copiada al portapapeles.");
            });
        }

        if (e.target.classList.contains("delete-btn")) {
            e.target.closest("li").remove();
            showMessage("URL eliminada correctamente.");
        }
    });
});
