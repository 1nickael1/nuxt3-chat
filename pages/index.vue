<template>
  <div class="container">
    <div class="container-left">
      <input type="text" v-model="messageToSend" @keyup.enter="func()">
      <button @click="func()" class="bt">
        Button
      </button>

    </div>
    <div class="container-right">
      <p v-for="(message) in messages">
        {{ message }}
      </p>
    </div>
  </div>
</template>
  
<script slang="ts">
export default {
  data: () => ({
    messages: [],
    messageToSend: '',
  }),
  mounted() {
    this.$io.on('message', (msg) => {
      this.messages.push(msg)
    });

    this.$io.on('historyMessages', (msg) => {
      this.messages = msg
    });
  },
  methods: {
    func() {
      this.$io.emit('message', this.messageToSend);
      this.messageToSend = ''
    }
  }
}
</script>
  
<style lang="css" scoped>
.bt {
  background: #202225;
  outline: none;
  border: none;
  color: #fff;
  font-family: proxima-nova, sans-serif;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 200ms;
  cursor: pointer;

  &:hover {
    background: #272a2e;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.container-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  min-height: 20vh;
  gap: 10px;
  background-color: gray;
}

.container-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  min-height: 20vh;
  gap: 10px;
  background-color: gray;
}

.container-right > p {
  margin: 0;
}
</style>