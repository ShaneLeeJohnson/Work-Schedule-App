// wraps all logic in a jquery function so that nothing is called until everything else has loaded on the page
$(function () {
  // Saves whatever text has been written in the text area of this time slot into local storage
  $('.saveBtn').click(function () {
    const timeBlockId = $(this).closest('.time-block').attr('id');
    const eventText = $(this).closest('.time-block').find('.description').val()
    localStorage.setItem(timeBlockId, eventText);
  })

  // Creates a currentTime variable and sets it equal to the current hour using day.js
  const currentTime = dayjs().hour();
  // For each time block in the schedule app, the text of hour-text class is parsed as an integer and
  // checked against the current hour to see if it's less than, equal to, or greater than the current 
  // hour and sets the past, present, and future classes on each time block accordingly.
  $('.time-block').each(function () {
    const blockHour = parseInt($(this).find('.hour-text').text());
    if (blockHour < currentTime) {
      $(this).addClass('past');
    } else if (blockHour === currentTime) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  })

  // Creates a savedEvents variable and sets it equal to the values in local storage as long as it isn't empty
  const savedEvents = Object.values(localStorage).filter(value => value !== '');
  // Retrieves each value stored in local storage and displays it in the correct time block using the 
  // time blocks id as the key and the text as the value
  savedEvents.forEach(eventText => {
    const timeBlockId = Object.keys(localStorage).find(key => localStorage[key] === eventText);
    const timeBlock = $(`#${timeBlockId}`);
    timeBlock.find('.description').val(eventText);
  })

  // creates a today variable and sets it to the current date then formats it to appear in this format: 
  // Monday January, 1
  let today = dayjs();
  const formattedToday = today.format('dddd MMMM, D');
  $('#currentDay').text(formattedToday);
});


