<template>
  <div>
    <div class="form-row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="last_name">Фамилия</label>
          <input
            v-model="form.last_name"
            type="text"
            class="form-control"
            id="last_name"
          />
        </div>
        <div class="form-group">
          <label for="first_name">Имя</label>
          <input
            v-model="form.first_name"
            type="text"
            class="form-control"
            id="first_name"
          />
        </div>
        <div class="form-group">
          <label for="middle_name">Отчество</label>
          <input
            v-model="form.middle_name"
            type="text"
            class="form-control"
            id="middle_name"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="passport">Серия и номер пасспорта</label>
          <input
            v-model="form.passport"
            type="text"
            class="form-control"
            id="passport"
          />
        </div>
        <div class="form-group">
          <label for="passport_issued_by">Кем выдан</label>
          <input
            v-model="form.passport_issued_by"
            type="text"
            class="form-control"
            id="passport_issued_by"
          />
        </div>
        <div class="form-group">
          <label for="passport_issued_date">Когда выдан</label>
          <input
            v-model="form.passport_issued_date"
            type="text"
            class="form-control"
            id="passport_issued_date"
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="phone">Номер телефона</label>
      <input v-model="form.phone" type="text" class="form-control" id="phone" />
    </div>

    <div class="form-group">
      <label for="violation">Нарушение</label>
      <input
        v-model="form.violation"
        type="text"
        class="form-control"
        id="violation"
      />
    </div>
    <div class="form-group">
      <label for="violation_status">Ущерб</label>
      <div class="custom-control custom-switch">
        <input
          v-model="form.violation_status"
          type="checkbox"
          class="custom-control-input"
          id="violation_status"
        />
        <label
          class="custom-control-label"
          v-if="form.violation_status === false"
          for="violation_status"
          >Не возмещён</label
        >
        <label
          class="custom-control-label"
          v-if="form.violation_status === true"
          for="violation_status"
          >Возмещён</label
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                first_name: null,
                last_name: null,
                middle_name: null,
                phone: null,
                passport: null,
                passport_issued_by: null,
                passport_issued_date: null,
                violation: null,
                violation_status: false,
            }
        }
    }
}
</script>