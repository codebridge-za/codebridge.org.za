var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1sN95ta5lfqeznMRJxx6F8Uub5BB-03t5W6VsIgS_9j0/pubhtml';

$(document).ready(function() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   parseNumbers: true } );
});
  
function showInfo(data, tabletop) {
  var source = $("#details").html();
  var template = Handlebars.compile(source);

  $.each( tabletop.sheets("Details").all(), function(i, detail) {
    var html = template(detail);
    $("#content").append(html);
  });

  $(".loading").hide();
  $(".well").addClass("active");
}

$(document).ready(function() {
  var visibleItems = [];
  $("#filter input" ).prop("checked", false);

  $("#province-filter .show-all").prop("checked", true);
  $("#collaboration-filter .show-all").prop("checked", true);

  $("#filter input").change(function () {
    $(".well").removeClass("active");
    if ( $("#theme-filter input:checked").length == 0) {
      $(".well").addClass("active");
    } else {
      $("#theme-filter input:checked").each(function() {
        $(".well." + $(this).val()).addClass("active");
      });
    }

    var provinces = ["easterncape","freestate","gauteng","kwazulu","limpopo","mpumalanga","northwest","northerncape","westerncape"];
    var collaboration = ["open", "closed"];

    console.log(provinces);
    console.log(collaboration);

    var selectedProvince = $("#province-filter input:checked").val();
    console.log("selected province: " + selectedProvince);
    var indexProvince = provinces.indexOf(selectedProvince);
    if (indexProvince >= 0 && selectedProvince != "all-collaboration") {
      provinces.splice(indexProvince, 1);
    }

    console.log(selectedProvince);

    if (selectedProvince != "all-provinces") {
      $(provinces).each(function() {
        $(".well." + this).removeClass("active");
      });
    }

    var selectedCollaboration = $("#collaboration-filter input:checked").val();
    console.log("selected collaboration: " + selectedCollaboration);

    var indexCollaboration = collaboration.indexOf(selectedCollaboration);
    if (indexCollaboration >= 0 && selectedCollaboration != "all-collaboration") {
      collaboration.splice(indexCollaboration, 1);
    }

    console.log(collaboration);

    if (selectedCollaboration != "all-collaboration") {
      $(collaboration).each(function() {
        $(".well." + this).removeClass("active");
      });
    }
  });
});