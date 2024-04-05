<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <v-card>
            <v-card-title>{{ ($t('profile.components.updateUser.updateString')) }}}</v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  color="green-darken-3"
                  :label="$t('profile.components.updateUser.nameString')"
                  variant="underlined"
                  v-model="localUserInfo.name"
                  :rules="nameRules"
                ></v-text-field>
                <v-text-field
                  color="green-darken-3"
                  :label="$t('profile.components.updateUser.lastNameString')"
                  variant="underlined"
                  v-model="localUserInfo.apellidoP"
                ></v-text-field>
                <v-text-field
                  color="green-darken-3"
                  :label="$t('profile.components.updateUser.motherNameString')"
                  variant="underlined"
                  v-model="localUserInfo.apellidoM"
                ></v-text-field>
                <v-text-field
                  color="green-darken-3"
                  type="date"
                  :label="$t('profile.components.updateUser.birthDateString')"
                  variant="underlined"
                  v-model="localUserInfo.fechaNacimiento"
                ></v-text-field>
                <v-select
                  :label="$t('registration.personalInformation.genderString')"
                  v-model="localUserInfo.genero"
                  :items="[$t('registration.personalInformation.maleString'), $t('registration.personalInformation.femaleString')]"
                  required
                  variant="underlined"
                  color="green-darken-3"
                ></v-select>
                <v-select
                  v-model="lada"
                  :items="['+1 (USA)', '+52 (Mexico)']"
                  :label="$t('registration.personalInformation.ladeString')"
                  variant="underlined"
                  color="green-darken-3"
                ></v-select>
                <v-text-field
                  color="green-darken-3"
                  :label="$t('profile.components.updateUser.phoneString')"
                  type="number"
                  variant="underlined"
                  v-model="localUserInfo.cellPhone"
                  :prefix="lada ? lada.split(' ')[0] : ''"
                ></v-text-field>
                <v-text-field
                  color="green-darken-3"
                  :label="$t('profile.components.updateUser.nameUserString')"
                  variant="underlined"
                  v-model="localUserInfo.username"
                ></v-text-field>
                <v-btn color="green-darken-3" block class="mt-3" @click="actualizarDatos">Actualizar datos</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { api } from '@/axios/axios';
  import { useUserStore } from '@/store/store';
  import { toast } from 'vue3-toastify';
  const userStore = useUserStore()

  export default {
    props: {
      userInfo: {
        type: Object,
        required: true,
      },
      
    },
    data () {
      return{
        lada : '+1 (USA)',
        localUserInfo: { ...this.userInfo },
        nameRules: [
          v => !!v || 'El nombre es requerido',
          v => (v && /^[a-zA-Z\s.'']+$/).test(v) || 'El nombre solo puede contener letras, espacios, apóstrofes y puntos'
        ],
      }
    },
    methods: {
      async actualizarDatos() {
        try {
          if (!this.$refs.form.validate()) {
            toast.warning('Llena correctante los campos')
            return;
          }
          const datos = {
            name :  this.localUserInfo.name, 
            apellidoP :  this.localUserInfo.apellidoP, 
            apellidoM :  this.localUserInfo.apellidoM, 
            fechaNacimiento :  this.localUserInfo.fechaNacimiento, 
            genero :  this.localUserInfo.genero, 
            cellPhone :  this.localUserInfo.cellPhone, 
            userName :  this.localUserInfo.username
          }
          const { data } = await api({
            method : 'PUT',
            url : '/user/update',
            headers : {
              'Authorization' : 'Bearer ' + userStore.token
            },
            data : datos,
          })
          if(!data.success) {
            toast.warning(data.msg)
          }
          else{
            toast.success(data.msg)
            this.$emit('update:userInfo', data.updatedUser);
            this.$emit('update:showUpdate', false);
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>
  