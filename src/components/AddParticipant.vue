<template>
    <div>
        <b-button v-b-modal.modal-1 variant="primary"
      >Anmeldung manuell hinzufügen</b-button
    >
    <b-modal id="modal-1" title="Prüfungsanmeldung hinzufügen">
        <b-card>
            <b-row>
            <p>Name</p>
            <b-form-input v-model="text" placeholder="Vorname, Nachname"></b-form-input>
            </b-row>
            <b-row>
            <p>Matrikelnummer</p>
            <b-form-input v-model="text" placeholder="7 Ziffern"></b-form-input>
            </b-row>
            <b-row>
                <b-form-group label="Studiengang" v-slot="{ ariaDescribedby }">
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A">Bachelor</b-form-radio>
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A">Master</b-form-radio>
    </b-form-group>
            </b-row>
            <b-row>
            <b-form-select v-model="selectedexam" :options="options" size="sm" class="mt-3"></b-form-select>
            </b-row>
            <b-row>
                <p> </p>
                <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
      Nachteilsausgleich?
    </b-form-checkbox>
            </b-row>
        </b-card>
    </b-modal>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: '',
        selectedexam: null,
        options: [
          { value: null, text: 'Prüfung auswählen' },
          { value: 'a', text: 'Einführung in die Wirtschaftsinformatik' },
          { value: 'b', text: 'Grundlagen der BWL' },
          { value: 'c', text: 'Integrierte Informationsverarbeitung' },
          { value: 'd', text: 'Decission Support Systems' }
        ]
      }
    }
  }
</script>