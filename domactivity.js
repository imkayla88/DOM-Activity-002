/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Parse data and populate thumbnails
    const paintings = JSON.parse(content);
    const ul = document.querySelector('#paintings ul');

    paintings.forEach(painting => {
        const li = document.createElement('li');
        const img = document.createElement('img');

        // Note: Adjust the folder paths below if your directory structure differs
        img.src = `images/small/${painting.id}.jpg`;
        img.dataset.id = painting.id;

        li.appendChild(img);
        ul.appendChild(li);
    });

    // 2. Event delegation on the parent list
    ul.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const paintingId = e.target.dataset.id;
            const painting = paintings.find(p => p.id === paintingId);

            // 3. Empty the figure and update main details
            const figure = document.querySelector('figure');
            figure.innerHTML = '';

            document.querySelector('#title').textContent = painting.title;
            document.querySelector('#artist').textContent = painting.artist;

            const largeImg = document.createElement('img');
            largeImg.src = `images/large/${painting.id}.jpg`;
            figure.appendChild(largeImg);

            // 4. Generate feature boxes
            const descriptionDiv = document.querySelector('#description');

            painting.features.forEach(feature => {
                const box = document.createElement('div');
                box.classList.add('box');

                const [x1, y1] = feature.upperLeft;
                const [x2, y2] = feature.lowerRight;

                box.style.position = 'absolute';
                box.style.left = `${x1}px`;
                box.style.top = `${y1}px`;
                box.style.width = `${x2 - x1}px`;
                box.style.height = `${y2 - y1}px`;

                // 5. Attach mouseover and mouseout events
                box.addEventListener('mouseover', () => {
                    descriptionDiv.textContent = feature.description;
                });

                box.addEventListener('mouseout', () => {
                    descriptionDiv.textContent = '';
                });

                figure.appendChild(box);
            });
        }
    });
});