const $main = $('main');
const $selector = $('#photo-filter');

const hornURL = 'https://raw.githubusercontent.com/CodePartnersMD/MD301-01/master/02-jquery-selectors-events/lab/page-1.json';

const Horn = function (imgObj) {
  this.title = imgObj.title;
  this.image_url = imgObj.image_url;
  this.description = imgObj.description;
  this.keyword = imgObj.keyword;
  this.horns = imgObj.horns;
}

let allHorns = [];
let keywords = [];

Horn.prototype.renderHorn = imgObj => {
  let $hornClone = $('#photo-template').clone();
  $main.append($hornClone);
  $hornClone.attr('class', imgObj.keyword);
  $hornClone.find('img').attr('src', imgObj.image_url);
}

$($selector).on('change', () => {
  $('section').hide();
  $(`.${event.target.value}`).show();
})

$.getJSON(hornURL, response => {
  response.forEach((val) => {
    let newHorn = new Horn(val);
    allHorns.push(newHorn);
    newHorn.renderHorn(val);
    if (!keywords.includes(`${newHorn.keyword}`)) {
      keywords.push(newHorn.keyword);
      $selector.append(`<option class=${newHorn.keyword}>${newHorn.keyword}</option>`)
    }
  })
})
