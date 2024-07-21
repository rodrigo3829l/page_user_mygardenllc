<template>
    <v-skeleton-loader type="list-item-avatar-two-line">
      <v-row>
        <!-- Icono -->
        <v-col cols="2">
          <v-skeleton-loader type="avatar"></v-skeleton-loader>
        </v-col>
  
        <!-- Título y Subtítulo -->
        <v-col cols="8">
          <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
        </v-col>
  
        <!-- Comentario -->
        <v-col cols="10">
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
        </v-col>
  
        <!-- Rating -->
        <!-- <v-col cols="2">
          <v-skeleton-loader type="list-item"></v-skeleton-loader>
        </v-col> -->
      </v-row>
    </v-skeleton-loader>
  </template>
  