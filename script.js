
const seatContainer = document.getElementById("seats");

const movieSelect = document.getElementById("movieSelect");

const selectedSeatsDisplay =
    document.getElementById("selectedSeats");

const totalPriceDisplay =
    document.getElementById("totalPrice");

const ticketPrice = 150;

let selectedSeats = [];

// Generate seats
function generateSeats() {

    for (let i = 1; i <= 40; i++) {

        const seat = document.createElement("div");

        seat.classList.add("seat");

        seat.innerText = i;

        // Some seats are already booked
        if ([5, 9, 15, 22, 28, 35].includes(i)) {
            seat.classList.add("booked");
        }

        seat.addEventListener("click", function () {

            if (seat.classList.contains("booked")) {
                return;
            }

            if (seat.classList.contains("selected")) {

                seat.classList.remove("selected");

                selectedSeats = selectedSeats.filter(
                    number => number !== i
                );

            } else {

                seat.classList.add("selected");

                selectedSeats.push(i);
            }

            updateSummary();
        });

        seatContainer.appendChild(seat);
    }
}

// Update ticket summary
function updateSummary() {

    selectedSeatsDisplay.innerText = selectedSeats.length;

    totalPriceDisplay.innerText =
        selectedSeats.length * ticketPrice;
}

// Select movie from movie card
function selectMovie(movie) {

    movieSelect.value = movie;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}

// Search movies
document.getElementById("searchInput")
    .addEventListener("input", function () {

        const searchValue = this.value.toLowerCase();

        const movieCards =
            document.querySelectorAll(".movie-card");

        movieCards.forEach(card => {

            const title =
                card.dataset.title.toLowerCase();

            card.style.display =
                title.includes(searchValue) ? "block" : "none";
        });
    });

// Set minimum booking date to today
const dateInput = document.getElementById("date");

const today = new Date();

const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localDate;
dateInput.value = localDate;

// Confirm booking
function confirmBooking() {

    const movie = movieSelect.value;

    const theatre =
        document.getElementById("theatre").value;

    const date = dateInput.value;

    const time =
        document.getElementById("showTime").value;

    if (!movie) {
        alert("Please select a movie!");
        return;
    }

    if (!date) {
        alert("Please select a booking date!");
        return;
    }

    if (selectedSeats.length === 0) {
        alert("Please select at least one seat!");
        return;
    }

    const amount = selectedSeats.length * ticketPrice;

    const seatNumbers = selectedSeats.join(", ");

    alert(
        "BOOKING CONFIRMED!\n\n" +
        "Movie: " + movie + "\n" +
        "Theatre: " + theatre + "\n" +
        "Date: " + date + "\n" +
        "Show Time: " + time + "\n" +
        "Seats: " + seatNumbers + "\n" +
        "Tickets: " + selectedSeats.length + "\n" +
        "Total Amount: ₹" + amount
    );

    // Reset selected seats
    document.querySelectorAll(".seat.selected")
        .forEach(seat => {
            seat.classList.remove("selected");
        });

    selectedSeats = [];

    updateSummary();
}

// Initialize
generateSeats();
