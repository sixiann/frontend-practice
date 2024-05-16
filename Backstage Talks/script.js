console.clear();

//page data
const colors = [
  "#ff608c",
  "white",
  "#00c1b5",
  "#ff651a",
  "#ffbe00",
  "#1d3fbb",
  "#e30512",
];

const data = [];
let issueNumber = 7;

for (let i = 0; i < 7; i++) {
  data.push({
    color: colors[i],
    imgUrl: `https://backstagetalks.com/img/backstagetalks_cover_issue_${issueNumber}.png`,
    text: `
            <p>Issue #${issueNumber}</p>
            <p>BUY HERE (Europe)</p>
            <p>BUY HERE (UK & Overseas)</p>
            <p>or in selected stores</p>
        `,
  });
  issueNumber--;
}

data[5].imgUrl = "https://backstagetalks.com/img/backstagetalks_cover2017.png";
data[6].imgUrl =
  "https://backstagetalks.com/img/backstagetalks_cover2016_n.png";

//add data to sections and anchor links to fixed element
const sectionsContainer = document.getElementById("sections-container");
const linksContainer = document.getElementById("links-container");

data.forEach((item, index) => {
  const anchor = document.createElement("a");
  anchor.href = `#section-${7 - index}`;
  anchor.textContent = `Issue #${7 - index}`;
  anchor.className = "issue-link";

  const linkWrapper = document.createElement("div");
  linkWrapper.appendChild(anchor);

  linksContainer.appendChild(linkWrapper);

  const section = document.createElement("section");
  section.classList.add("flex-center", "section");
  section.dataset.bgcolor = item.color;
  section.id = `section-${index}`;
  section.innerHTML = `
        <div class="row vh-100">
            <div class="col-md-3"></div>
            <div class="col-md-6 flex-center flex-column p-5">      
                <img src="${item.imgUrl}" class="img-fluid">
                ${item.text}
            </div>
            <div class="col-md-3"></div>
        </div>
    `;

  sectionsContainer.appendChild(section);
});

// scrolling effect
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".section");

const switchColor = (color) => {
  gsap.to(document.body, {
    duration: 0.3,
    ease: "power1.inOut",
    backgroundColor: color,
    overwrite: "auto",
  });
};

sections.forEach((section, i) => {
  const color = section.dataset.bgcolor;
  const previousColor = sections[i - 1]
    ? sections[i - 1].dataset.bgcolor
    : "#000000";
  console.log(previousColor);
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => switchColor(color),
    onEnterBack: () => i === sections.length - 1 && switchColor(color),
    onLeave: () => i === sections.length - 1 && switchColor("#000000"),
    onLeaveBack: () => switchColor(previousColor),
    id: i + 1,
  });
});
