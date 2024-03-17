const loadPhoneData = async (brand='iphone') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${brand}`
  );
  const data = await res.json();
  const phones = data.data;
  document.getElementById('result').innerText = `${phones.length} items shows.`
  displayPhone(phones);
};

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  const showAllBtn = document.getElementById('showAllBtn')

  if(phones.length > 5) {
    showAllBtn.classList.remove('hidden')
  } else {
    showAllBtn.classList.add('hidden')
  }
  phoneContainer.textContent = ''
  phones = phones.slice(0,5)
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto`;
    phoneCard.innerHTML = `
    <div class="w-80 bg-base-100 shadow-xl rounded-xl p-8 flex flex-col items-center" >
      <img class="w-40" src="${phone.image}" />
      <div class="text-center">
        <h2 class="font-bold text-2xl mt-6">${phone.phone_name}</h2>
        <p class="text-base text-[#706F6F] mt-5">
          There are many variations of passages of available, but the
          majority have suffered
        </p>
        <h2 class="font-bold text-2xl mt-2">$999</h2>
        <button class=" btn text-white bg-blue-700 mt-4 hover:text-blue-700 hover:border hover:border-blue-700">Show Details</button>
      </div>
    </div>
    `;
    // console.log(phoneCard)
    phoneContainer.appendChild(phoneCard);
  });
};

loadPhoneData();

document.getElementById("hunterBtn").addEventListener("click", function () {
  const brand = document.getElementById('hunterField').value
  loadPhoneData(brand)
});
