define([], function(){

    const component = {
        template: "<div>子组件<input v-model='curName'></div>",
        data: function () {
            return {
                curName: this.name
            }
        },
        props: ['name'],
        watch: {
            'name': function (newVal, oldVal) {
                this.curName = newVal;
            },
            curName: function (newVal, oldVal) {
                this.$emit("update:name", newVal);
            }
        }
    };

    return component;
});