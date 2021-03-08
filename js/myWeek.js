function draw(data){
  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: '2021-02-07',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events:data
    });

    calendar.render();
  });
    // var calendarEl = document.getElementById('calendar');
    // var calendar = new FullCalendar.Calendar(calendarEl, {
    //   initialView: 'dayGridMonth'
    // });
    // calendar.render();

}
 