import {mapState} from "vuex";

export default {
    computed: {
        ...mapState('auth', ['user'])
    },
    created() {
        if(this.user){
            this.$router.push({
                name: 'Dashboard Profile'
            })
        }
    },
}