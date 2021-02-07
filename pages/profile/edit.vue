<template>
  <div class="container py-5">
    <div class="row">
      <div class="col">
        <b-card no-body>
          <b-tabs pills card nav-wrapper-class="col-lg-auto">
            <b-tab title="Профиль" active>
              <h1 class="h2">Профиль</h1>
              <b-form @submit.prevent="profileSubmit">
                <b-form-row>
                  <b-col lg="6">
                    <b-form-group
                      id="name-group"
                      label="Коммерческое название организации"
                      label-for="name">
                      <b-form-input
                        id="name"
                        v-model="profileForm.name"
                        placeholder="Blackinfo"
                        required></b-form-input>
                      <div v-if="!!profileErrors.name"
                           v-for="(error, index) of profileErrors.name"
                           :key="index" class="invalid-feedback d-block">{{error}}</div>
                    </b-form-group>
                    <b-form-group
                      id="organization-name-group"
                      label="Название организации (ООО / ИП)"
                      label-for="organization-name">
                      <b-form-input
                        id="organization-name"
                        v-model="profileForm.organization_name"
                        placeholder='ООО "Blackinfo"'
                        required></b-form-input>
                      <div v-if="!!profileErrors.organization_name"
                           v-for="(error, index) of profileErrors.organization_name"
                           :key="index" class="invalid-feedback d-block">{{error}}</div>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group
                      id="inn-group"
                      label="ИНН"
                      label-for="inn">
                      <b-form-input
                        id="inn"
                        v-model="profileForm.inn"
                        placeholder="3869376894"
                        required></b-form-input>
                      <div v-if="!!profileErrors.inn"
                           v-for="(error, index) of profileErrors.inn"
                           :key="index" class="invalid-feedback d-block">{{error}}</div>
                    </b-form-group>
                    <b-form-group
                      id="ogrn-group"
                      label="ОГРН / ОГРНИП"
                      label-for="ogrn">
                      <b-form-input
                        id="ogrn"
                        v-model="profileForm.ogrn"
                        placeholder="7583668439047"
                        required></b-form-input>
                      <div v-if="!!profileErrors.ogrn"
                           v-for="(error, index) of profileErrors.ogrn"
                           :key="index" class="invalid-feedback d-block">{{error}}</div>
                    </b-form-group>
                  </b-col>
                </b-form-row>
                <b-form-group
                  id="phone-group"
                  label="Номер телефона"
                  label-for="phone">
                  <b-form-input
                    id="phone"
                    v-model="profileForm.phone"
                    placeholder="89001234567"
                    required></b-form-input>
                </b-form-group>
                <b-alert variant="info" :show="true">
                  После изменения информации в этом разделе,
                  ваш аккаунт должен будет снова пройти проверку администратора.
                </b-alert>
                <b-btn type="submit" variant="primary">Сохранить</b-btn>
              </b-form>
            </b-tab>
            <b-tab title="Доп. информация">
              <h1 class="h2">Доп. информация</h1>
              <b-form @submit.prevent="addInfSubmit">
                <b-form-row>
                  <b-col lg="3" class="text-center">
                    <img v-if="$auth.user.avatar !== null" class="img-fluid rounded-lg"
                         width="200" :src="$auth.user.avatar" alt=""/>
                    <img v-if="$auth.user.avatar === null" class="img-fluid rounded-lg"
                         width="200" src="~/assets/img/user.png" alt=""/>
                  </b-col>
                  <b-col lg="9">
                    <b-form-group id="profile-avatar-group"
                                  label="Логотип компании / Фото представителя"
                                  label-for="profile-avatar">
                      <b-form-file
                        id="profile-avatar"
                        v-model="addInfForm.avatar"
                        browse-text="Выбрать"
                        accept=".jpg, .png, .gif"
                        placeholder="Выберите файл..."></b-form-file>
                      <div v-if="!!addInfErrors.avatar"
                           v-for="(error, index) of addInfErrors.avatar"
                           :key="index" class="invalid-feedback d-block">{{error}}</div>
                    </b-form-group>
                    <b-form-group
                      id="website-group"
                      label="Сайт"
                      label-for="website">
                      <b-form-input
                        id="website"
                        v-model="addInfForm.site"
                        placeholder="https://your-site.ru"></b-form-input>
                      <div v-if="!!addInfErrors.site"
                           v-for="(error, index) of addInfErrors.site"
                           :key="index" class="invalid-feedback d-block">{{error}}</div>
                    </b-form-group>
                    <b-form-group
                      id="about-group"
                      label="О компании"
                      label-for="about">
                      <b-textarea
                        id="about"
                        rows="5"
                        v-model="addInfForm.about"></b-textarea>
                      <div v-if="!!addInfErrors.about"
                           v-for="(error, index) of addInfErrors.about"
                           :key="index" class="invalid-feedback d-block">{{error}}</div>
                    </b-form-group>
                    <b-btn type="submit" variant="primary">Сохранить</b-btn>
                  </b-col>
                </b-form-row>
              </b-form>
            </b-tab>
            <b-tab title="E-mail">
              <h1 class="h2">E-mail</h1>
              <b-form @submit.prevent="emailSubmit">
                <b-form-group
                  id="email-group"
                  label="E-Mail"
                  label-for="email">
                  <b-form-input
                    id="email"
                    v-model="emailForm.email"
                    required></b-form-input>
                  <div v-if="!!emailErrors.email"
                       v-for="(error, index) of emailErrors.email"
                       :key="index" class="invalid-feedback d-block">{{error}}</div>
                </b-form-group>
                <b-alert variant="info" :show="true">
                  После изменения, E-Mail нужно будет подтвердить снова
                </b-alert>
                <b-btn type="submit" variant="primary">Сохранить E-Mail</b-btn>
              </b-form>
            </b-tab>
            <b-tab title="Пароль">
              <h1 class="h2">Пароль</h1>
              <b-form @submit.prevent="passwordSubmit">
                <b-form-group
                  id="password-group"
                  label="Новый пароль"
                  label-for="password">
                  <b-form-input
                    id="password"
                    type="password"
                    v-model="passwordForm.password"
                    required></b-form-input>
                  <div v-if="!!passwordErrors.password"
                       v-for="(error, index) of passwordErrors.password"
                       :key="index" class="invalid-feedback d-block">{{error}}</div>
                </b-form-group>
                <b-form-group
                  id="password-confirmation-group"
                  label="Подтверждение пароля"
                  label-for="password-confirmation">
                  <b-form-input
                    id="password-confirmation"
                    type="password"
                    v-model="passwordForm.password_confirmation"
                    required></b-form-input>
                </b-form-group>
                <b-btn type="submit" variant="primary">Обновить пароль</b-btn>
              </b-form>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "edit",
    data() {
      return {
        profileForm: {
          name: this.$auth.user.name,
          organization_name: this.$auth.user.organization_name,
          inn: this.$auth.user.inn,
          ogrn: this.$auth.user.ogrn,
          phone: this.$auth.user.phone,
        },
        profileErrors: {
          name: null,
          organization_name: null,
          inn: null,
          ogrn: null,
          phone: null,
        },
        addInfForm: {
          avatar: null,
          site: this.$auth.user.site ?? "",
          about: this.$auth.user.about,
        },
        addInfErrors: {
          avatar: null,
          site: null,
          about: null,
        },
        emailForm: {
          email: this.$auth.user.email
        },
        emailErrors: {
          email: null
        },
        passwordForm: {
          password: "",
          password_confirmation: "",
        },
        passwordErrors: {
          password: null,
        },
      }
    },
    methods: {
      async profileSubmit() {
        await this.$axios.$patch("/api/profile", this.profileForm)
          .then(() => {
            this.$bvToast.toast('Профиль успешно обновлён', {
              title: "Blackinfo",
              variant: 'success',
            })
            this.profileErrors = {
              name: null,
              organization_name: null,
              inn: null,
              ogrn: null,
              phone: null,
            }
            this.$auth.fetchUser()
          }).catch(e => {
            if (e.response.status === 422) {
              this.profileErrors = {
                name: e.response.data.errors.name ?? null,
                organization_name: e.response.data.errors.organization_name ?? null,
                inn: e.response.data.errors.inn ?? null,
                ogrn: e.response.data.errors.ogrn ?? null,
                phone: e.response.data.errors.phone ?? null,
              }
            } else {
              this.$bvToast.toast('Ошибка. Профиль не обновлён. Попробуйте позже.', {
                title: "Blackinfo",
                variant: 'danger',
              })
            }
          })
      },
      async addInfSubmit() {
        let formData = new FormData();
        formData.append('_method', 'PATCH')
        if (this.addInfForm.site !== ""){
          formData.append('site', this.addInfForm.site)
        } else {
          formData.append('site', '')
        }
        formData.append('about', this.addInfForm.about)
        if(this.addInfForm.avatar !== null)
          formData.append('avatar', this.addInfForm.avatar)
        await this.$axios.$post("/api/profile", formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(() => {
          this.$bvToast.toast('Профиль успешно обновлён', {
            title: "Blackinfo",
            variant: 'success',
          })
          this.addInfErrors = {
            avatar: null,
            site: null,
            about: null,
          }
          this.$auth.fetchUser()
        }).catch(e => {
          if (e.response.status === 422) {
            this.addInfErrors = {
              avatar: e.response.data.errors.avatar ?? null,
              site: e.response.data.errors.site ?? null,
              about: e.response.data.errors.about ?? null,
            }
          } else {
            this.$bvToast.toast('Ошибка. Профиль не обновлён. Попробуйте позже.', {
              title: "Blackinfo",
              variant: 'danger',
            })
          }
        })
      },
      async emailSubmit() {
        await this.$axios.$patch("/api/profile", this.emailForm)
          .then(() => {
            this.$bvToast.toast('Профиль успешно обновлён', {
              title: "Blackinfo",
              variant: 'success',
            })
            this.emailErrors = {
              email: null
            }
            this.$auth.fetchUser()
          }).catch(e => {
            if (e.response.status === 422) {
              this.emailErrors = {
                email: e.response.data.errors.email ?? null,
              }
            } else {
              this.$bvToast.toast('Ошибка. Профиль не обновлён. Попробуйте позже.', {
                title: "Blackinfo",
                variant: 'danger',
              })
            }
          })
      },
      async passwordSubmit() {
        await this.$axios.$patch("/api/profile", this.passwordForm)
          .then(() => {
            this.$bvToast.toast('Профиль успешно обновлён', {
              title: "Blackinfo",
              variant: 'success',
            })
            this.passwordErrors = {
              password: null,
            }
            this.$auth.fetchUser()
          }).catch(e => {
            if (e.response.status === 422) {
              this.passwordErrors = {
                password: e.response.data.errors.password ?? null,
              }
            } else {
              this.$bvToast.toast('Ошибка. Профиль не обновлён. Попробуйте позже.', {
                title: "Blackinfo",
                variant: 'danger',
              })
            }
          })
      },
    }
  }
</script>

<style scoped>

</style>
