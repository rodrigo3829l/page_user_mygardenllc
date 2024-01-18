<template>
  <div class="colorNav"></div>
  <div class="developer-section">
        <div class="container">
            <h2 class="tittle">Desarrolladores</h2>
            <div class="developer-card">
                <!-- Desarrollador 1 -->
                <div class="developer">
                    <img src="../../../../src/img/rodrigo.jpg" alt="Desarrollador 1">
                    <div class="developer-info">
                        <h3>Rodrigo Del Angel Gerardo</h3>
                        <p>Universidad Tecnologica de la Huasteca Hidalguense</p>
                        <p>Matrícula: 20210658</p>
                        <p>Correo: 20210658@uthh.edu.mx</p>
                        <p>Carrera: Ingenieria en Desarrollo y Gestion de Software</p>
                        <p>Teléfono: 771-204-5261</p>
                        <p>Grado 7 - Grupo A</p>
                    </div>
                </div>

                <!-- Desarrollador 2 -->
                <div class="developer">
                    <img src="../../../../src/img/avelina.jpg" alt="Desarrollador 2">
                    <div class="developer-info">
                        <h3>Avelina Hernández Hernández</h3>
                        <p>Universidad Tecnologica de la Huasteca Hidalguense</p>
                        <p>Matrícula: 20210667</p>
                        <p>Correo: 20210667@uthh.edu.mx</p>
                        <p>Carrera: Ingenieria en Desarrollo y Gestion de Software</p>
                        <p>Teléfono: 771-159-6298</p>
                        <p>Grado 7 - Grupo A</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.tittle{
            font-size: 50px;
        }
        .developer-section {
            background-color: #fff;
            text-align: center;
        }

        .developer-card {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        .developer {
            flex-basis: calc(50% - 20px);
            margin-right: 20px;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .developer img {
            max-width: 50%;
            border-radius: 10%;
        }

        .developer-info {
            margin-top: 20px;
            text-align: left;
        }

        .developer-info h3 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .developer-info p {
            font-size: 18px;
            margin: 0;
        }
</style>