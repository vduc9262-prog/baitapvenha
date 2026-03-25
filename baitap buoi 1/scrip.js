
const titleInput = document.getElementById('movieTitle');
const descInput = document.getElementById('movieDesc');
const saveBtn = document.getElementById('saveBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const movieListContainer = document.getElementById('movieList');


let loadMovies=()=>{
    movieListContainer.innerHTML = '';
    const movies = JSON.parse(localStorage.getItem('wantToWatchMovies')) || [];
    movies.forEach((movie, index) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <h3>🎥 ${movie.title}</h3>
            <p>${movie.description || '<em>Không có mô tả</em>'}</p>
            <div class="date">Lưu lúc: ${movie.date}</div>
            <button class="delete-one" data-index="${index}">Xóa phim này</button>
        `;

        card.querySelector('.delete-one').addEventListener('click',()=>{
            deleteMovie(index);
});

        movieListContainer.appendChild(card);
        });
}

let saveMovie =()=> {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    if (!title) {
        alert("Vui lòng nhập tiêu đề phim!");
        titleInput.focus();
        return;
    }

    const movies = JSON.parse(localStorage.getItem('wantToWatchMovies'))||[];

    const newMovie = {
        title: title,
        description: desc,
        date: new Date().toLocaleString('vi-VN')
    };

    movies.push(newMovie);
    localStorage.setItem('wantToWatchMovies', JSON.stringify(movies));

    titleInput.value = '';
    descInput.value = '';
    loadMovies();
}

let deleteMovie = (index) => {
    if (!confirm("Xóa phim này khỏi danh sách?")) return;

    let movies = JSON.parse(localStorage.getItem('wantToWatchMovies')) || [];
    movies.splice(index, 1);
    localStorage.setItem('wantToWatchMovies', JSON.stringify(movies));
    loadMovies();
}

let deleteAll = () => {
    if (!confirm("Bạn có chắc muốn xóa TOÀN BỘ danh sách?"))

        return;
    localStorage.removeItem('wantToWatchMovies');

    loadMovies();
}
saveBtn.addEventListener('click', saveMovie);
deleteAllBtn.addEventListener('click', deleteAll);
window.addEventListener('load', loadMovies);