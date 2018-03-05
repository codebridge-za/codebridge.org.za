// Events
function loadEvents() {
  var eventsDoc = 'https://docs.google.com/spreadsheets/d/1Wc7hkoh0T32zDRtcJIVGw1pKqTjHASAlj92vz6Qz5zs/pubhtml';

  $(document).ready(function() {
    Tabletop.init({
      key: eventsDoc,
      callback: showEvents,
      orderby: 'featured',
      parseNumbers: false
    });
  });

  function showEvents(data, tabletop) {
    var source = $("#events-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Events").all(), function(i, detail) {
      var html = template(detail);
      $("#events").append(html);
    });

    $("time.time").each(function() {
      var time = $(this).text();
      cleanTime = time.trim().slice(0, -3);
      $(this).text(cleanTime);
    });

    $("#events .col-item").each(function() {
      var eventDate = $(this).find("time.date").text(),
          eventTime = $(this).find("time.start").text(),
          fullDate = (eventDate.trim() + " " + eventTime.trim()),
          parsedDate = Date.parse(fullDate),
          now = Date.now();
      console.log(fullDate);
      console.log(Date.parse(fullDate));
      if (parsedDate < now) {
        $(this).remove();
      };
    });


    $("#events .col-item.approved").each(function() {
      if ( $(this).index() < 6 ) {
        $(this).addClass("visible");
      }
    });

  };

};

// Projects
function loadProjects() {
  var projectsDoc = 'https://docs.google.com/spreadsheets/d/1HJBxoYSVZyPrMuXLa5rrk0_5FcMUA9I48B6gltXpbA4/pubhtml';

  $(document).ready(function() {
    Tabletop.init({
      key: projectsDoc,
      callback: showProjects,
      orderby: 'featured',
      parseNumbers: false
    });
  });

  function showProjects(data, tabletop) {
    var source = $("#projects-template").html();
    var template = Handlebars.compile(source);

    $.each( tabletop.sheets("Projects").all(), function(i, detail) {
      var html = template(detail);
      $("#projects").append(html);
    });

    $("#projects .col-item.approved").each(function() {
      if ( $(this).index() < 6 ) {
        $(this).addClass("visible");
      }
    });
  };
};

loadEvents();
loadProjects();