<template>

  <div ref="scheduler"></div>
</template>
 
<script>
import 'dhtmlx-scheduler'




export default {
  name: 'scheduler',
  props: {
    events: {
      type: Array,
      default () {
        return {events: []}
      }
    }
  },
 
  mounted: function () {
    scheduler.skin = "material";
    scheduler.config.header = [
        "day",
        "week",
        "month",
        "date",
        "prev",
        "today",
        "next"
    ];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    scheduler.init(this.$refs.scheduler, new Date(2019, 7, 12), "week");
    scheduler.parse(this.$props.events);
    scheduler.config.first_hour = 8;
    scheduler.config.last_hour = 20;

    Scheduler.plugin(function(e){e.locale={date:{month_full:[" Januar"," Februar"," März "," April"," Mai"," Juni"," Juli"," August"," September "," Oktober"," November "," Dezember"],month_short:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],day_full:["Sonntag","Montag","Dienstag"," Mittwoch"," Donnerstag","Freitag","Samstag"],day_short:["So","Mo","Di","Mi","Do","Fr","Sa"]},labels:{dhx_cal_today_button:"Heute",day_tab:"Tag",week_tab:"Woche",month_tab:"Monat",
    new_event:"neuer Eintrag",icon_save:"Save",icon_cancel:"Abbrechen",icon_details:"Details",icon_edit:"Ändern",confirm_closing:"",confirm_deleting:"Der Eintrag wird gelöscht",section_description:"Beschreibung",section_time:"Zeitspanne",full_day:"Ganzer Tag",confirm_recurring:"Wollen Sie alle Einträge bearbeiten oder nur diesen einzelnen Eintrag?",section_recurring:"Wiederholung",button_recurring:"Aus",button_recurring_open:"An",
    button_edit_series:"Bearbeiten Sie die Serie",button_edit_occurrence:"Bearbeiten Sie eine Kopie",agenda_tab:"Agenda",date:"Datum",description:"Beschreibung",year_tab:"Jahre",week_agenda_tab:"Agenda",grid_tab:"Grid",drag_to_create:"Drag to create",drag_to_move:"Drag to move",message_ok:"OK",message_cancel:"Abbrechen",next:"Next",prev:"Previous",year:"Year",month:"Month",day:"Day",hour:"Hour",minute:"Minute",repeat_radio_day:"Täglich",repeat_radio_week:"Wöchentlich",repeat_radio_month:"Monatlich",
    repeat_radio_year:"Jährlich",repeat_radio_day_type:"jeden",repeat_text_day_count:"Tag",repeat_radio_day_type2:"an jedem Arbeitstag",repeat_week:" Wiederholt sich jede",repeat_text_week_count:"Woche am:",repeat_radio_month_type:"an jedem",repeat_radio_month_start:"am",repeat_text_month_day:"Tag eines jeden",repeat_text_month_count:"Monats",repeat_text_month_count2_before:"jeden",repeat_text_month_count2_after:"Monats",repeat_year_label:"am",select_year_day2:"im",repeat_text_year_day:"Tag im",
    select_year_month:"",repeat_radio_end:"kein Enddatum",repeat_text_occurences_count:"Ereignissen",repeat_radio_end3:"Schluß",repeat_radio_end2:"nach",month_for_recurring:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],day_for_recurring:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]}}});
  }
}
</script>
 
<style>
    @import "~dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
</style>