
var data = [
  {
    name: 'Emily Selman',
    email: 'emilyselman@example.com',
    date: 'January 7, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-11.jpg'
  },
  {
    name: 'Michael Foster',
    email: 'michaelfoster@example.com',
    date: 'February 12, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-13.jpg'
  },
  {
    name: 'Emma Dorsey',
    email: 'emmdorsey@example.com',
    date: 'March 22, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-9.jpg'
  },
  {
    name: 'Anna Roberts',
    email: 'annaroberts@example.com',
    date: 'April 4, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-8.jpg'
  },
  {
    name: 'Leonard Krasner',
    email: 'leonardkrasner@example.com',
    date: 'May 18, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-7.jpg'
  },
  {
    name: 'Floyd Miles',
    email: 'floydmiles@example.com',
    date: 'June 1, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-6.jpg'
  },
  {
    name: 'Benjamin Russel',
    email: 'benjaminrussel@example.com',
    date: 'July 7, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-5.jpg'
  },
  {
    name: 'Courtney Henry',
    email: 'courtneyhenry@example.com',
    date: 'August 22, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-4.jpg'
  },
  {
    name: 'Lawrence Hunter',
    email: 'lawrencehunter@example.com',
    date: 'September 9, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-3.jpg'
  },
  {
    name: 'Alicia Bell',
    email: 'aliciabell@example.com',
    date: 'October 15, 2020',
    status: 'Completed phone screening',
    avatar: 'assets/media/avatars/150-2.jpg'
  }
];

function getItemMapping(item) {
  return `
  <tr class="border-b dark:border-gray-300">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      <div class="flex justify-start items-center">
        <img class="w-10 h-10 rounded-full mr-2" src=${item.avatar} alt="user photo">
        <div class="flex flex-col">
          <h6 class="text-indigo-600 mb-2 text-md">${item.name}</h6>
          <a href="#" class="text-gray-400 hover:text-primary font-medium text-base mb-2">
            <i class="fa-solid fa-envelope mr-2"></i>${item.email}
          </a>
        </div>
      </div>
    </th>
    <td class="px-6 py-4">
      <div class="flex flex-col">
        <h6 class="text-neutral-900 mb-2 text-md font-meduim">Applied on ${item.date}</h6>
        <a href="#" class="text-gray-400 hover:text-primary font-normal text-base mb-2">
          <i class="fa-solid fa-circle-check mr-2 text-lime-400"></i>${item.status}
        </a>
      </div>
    </td>
    <td class="px-6 py-4 text-right">
      <a href="#"><i class="fa-solid fa-angle-right"></i></a>
    </td>
  </tr>
`;
}

var rows = data.map(item => getItemMapping(item));
document.getElementById('table-body').innerHTML = rows.join('');


//pagination 
var current_page = 1;
//record per page
var records_per_page = 5;

// Can be obtained from another source, such as your data variable

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function toggleItemCount (e) {
  changePage(e);
};
    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("table-body");
    var page_span = document.querySelector(".div-ul-count");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < data.length; i++) {
        listing_table.innerHTML += getItemMapping(data[i]);
    }

    //mapping count
    var countAllPages = numPages();
    var result = '';
    var itemCount = (x) => {
      const isActive = page === x;
      const activeClasses = isActive ? "border-t border-indigo-300 text-indigo-800 dark:text-indago-800" : "";
      const inactiveClasses = isActive ? "" : "border-gray-200 text-gray-500 dark:text-gray-400";
    
      return `<li>
        <a
          key="${x}"
          href="javascript:toggleItemCount(${x})"
          aria-current="${x}"
          class="px-3 py-2 leading-tight bg-white ${activeClasses} ${inactiveClasses} hover:bg-gray-100 hover:text-gray-700 dark:bg-transparent dark:border-indigo-700  dark:hover:bg-transparent dark:hover:text-indigo-800"
        >
          ${x}
        </a>
      </li>`;
    };


    for (var i = 1; i <= countAllPages; i++) {
      result += itemCount(i);
    }
    page_span.innerHTML = result;

    var elementCount  = document.getElementsByTagName('li');

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(data.length / records_per_page);
}

window.onload = function() {
    changePage(1);
};