function proceedToResults() {
    const symptoms = document.getElementById("symptoms").value.trim();
    const temperature = document.getElementById("temperature").value.trim();
  
    if (!symptoms || !temperature) {
      alert("Please fill out symptoms and temperature.");
      return;
    }
  
    document.getElementById("results-section").classList.remove("hidden");
  }
  
  function addToCart(medicineName) {
    alert(`${medicineName} has been added to your cart.`);
  }
  