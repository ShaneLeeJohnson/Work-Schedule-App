$(function () {
  $('.saveBtn').click(function () {
    const timeBlockId = $(this).closest('.time-block').attr('id');
    const eventText = $(this).closest('.time-block').find('.description').val()
    localStorage.setItem(timeBlockId, eventText);
  })

  const currentTime = dayjs().hour();
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

  const savedEvents = Object.values(localStorage).filter(value => value !== '');
  savedEvents.forEach(eventText => {
    const timeBlockId = Object.keys(localStorage).find(key => localStorage[key] === eventText);
    const timeBlock = $(`#${timeBlockId}`);
    timeBlock.find('.description').val(eventText);
  })

  let today = dayjs();
  const formattedToday = today.format('dddd D, YYYY');
  $('#currentDay').text(formattedToday);
});


