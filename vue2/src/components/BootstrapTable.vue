<template>
    <div>
        <h2>Prüfungsplan</h2>
        <b-table striped hover outlined :fields="fields" :items="registrations"></b-table>
    </div>
</template>

<script>
import moment from 'moment';


export default {
    /*methods: {
        formatDate (value) {
            if (value) {
                return moment(String(value)).format('DD.MM.YYYY - hh:mm') + ' Uhr'
            }
        }
    },*/
    // <h3>{{registrations[0].date | formatDate}}</h3>
    data: () => ({
    registrations: [
        {
            "date": "2016-11-15T04:34:46.928Z",
            "exam": "Mathe",
            "examId": 1983747,
            "lastName": "Testinger",
            "firstName": "Matthias",
            "matriculation_number": 2193912
        },
        {
            "date": 1613606400000,
            "exam": "Mathe",
            "examId": 1983747,
            "lastName": "Hefinger",
            "firstName": "Matthias",
            "matriculation_number": 2193912
        },
        {
            "date": 1613606400000,
            "exam": "Mathe",
            "examId": 1983747,
            "lastName": "Beckeringer",
            "firstName": "Lucinger",
            "matriculation_number": 423421
        },
        {
            "date": 1613606400000,
            "exam": "Mathe",
            "examId": 1983747,
            "lastName": "K\u00f6niger",
            "firstName": "Adrainiger",
            "matriculation_number": 2110670
        }
    ],
    fields: [
        {
            key: 'date',
            label: 'Datum',
            formatter: value => {
                return moment(String(value)).format('DD.MM.YYYY - hh:mm') + ' Uhr'
            }
        },
        'exam',
        'examId',
        'lastName',
        'firstName',
        'matriculation_number'
    ]
  })
}
</script>