import $ from 'jquery';



// a promis that is getting encounters data from API

const getEncounters = new Promise((resolve, reject) => {
  $.ajax({
    url: "https://red-wdp-api.herokuapp.com/api/mars/encounters",
    method: "GET"
  })
    .done((data) => {
      if (data.encounters) {
        // console.log(data);
        // console.log(data.encounters);
        resolve(data.encounters);
      }
      else {
        reject();
      }
    })
    .fail((err) => {
      reject(err);
    });
});

export {getEncounters};




// from empty place

// <Encounter id={encounter.id} />