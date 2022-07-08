<template>
    <div>
        <template  v-for="(mark, index) of (marks)" >
        <template> 
        <v-subheader
           :key="mark.id"
        ></v-subheader>

        <v-divider
           :key="index"
        ></v-divider>

        <v-list-item
         :key="mark.answer_data.question_data.text"
        >
          <v-list-item-avatar>
            <v-img :src="require('@/static/task-icon.jpg')"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="'Вопрос: ' + mark.answer_data.question_data.text"></v-list-item-title>
            <v-list-item-subtitle v-html="'Ответ: ' + mark.answer_data.text"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="'Пользователь: ' + mark.user"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="'Оценка: ' + mark.mark"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="'Тема: ' + mark.answer_data.question_data.category_data[0].title"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        </template>
      </template>
    </div>
</template>

<script>
export default {
    props: ['marks'],
    name: 'Order'
}
</script>