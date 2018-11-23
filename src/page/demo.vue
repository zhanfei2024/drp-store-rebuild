<template>
    <div class="demo-page">
        <div class="container">
            <div class="item item-1">grid demo</div>
            <div class="item item-2">
                <div class="content">tab1</div>
                <div class="content">tab2</div>
                <div class="content">tab3</div>
                <div class="content">tab4</div>
                <div class="content">tab5</div>
                <div class="content">tab6</div>
            </div>
            <div class="item item-3">
                <div class="content">content1</div>
                <div class="content">content2</div>
            </div>
            <div class="item item-4">sidebar</div>
            <div class="item item-5">
                <div>footer</div>
                <div>footer</div>
                <div>footer</div>
                <div>footer</div>
                <div>footer</div>
                <div>footer</div>
            </div>
        </div>

        <section class="container2">
            <div class="item-a">item-aitem-aitem-aitem-aitem</div>
            <div class="item-b">item-b</div>
            <div class="item-c">item-c</div>
            <div class="item-d">item-d</div>
            <div class="item-e">item-e</div>
        </section>
        
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
      return {

      }
    },
    components: {

    }
}
</script>


<style lang="scss">
.demo-page {
    height: 100%;
}
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 50px 1fr;
    grid-template-rows: 40px;
    grid-template-areas: 
        'header header header header'
        'tab tab tab tab'
        'main main main sidebar'
        'footer footer footer footer';
    grid-column-gap: .625rem;
    grid-row-gap: .625rem;
    line-height: 2rem;
    // justify-items: stretch;
    // align-items: stretch;
    // justify-content: start;
    .item-1 {
        grid-area: header;
        background-color: violet;
    }
    .item-2 {
        grid-area: tab;
        background-color: turquoise;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .item-3 {
        grid-area: main;
        grid-column-start: 1;
        grid-column-end: span 3;
        grid-row-start: 3;
        grid-row-end: span 2;
        background-color: yellow;
    }
    .item-4 {
        grid-area: sidebar;
        grid-column-start: 4;
        grid-column-end: span 1;
        grid-row-start: 3;
        grid-row-end: span 2;
        background-color: tomato;
    }
    .item-5 {
        grid-area: footer;
        grid-column-start: 1;
        grid-column-end: span 5;
        grid-row-start: 5;
        grid-row-end: span 3;
        background-color: teal;
    }
}
.container2 {
    display: grid;
    grid-template-columns: 60px 60px 60px 60px 60px;
    grid-template-rows: 30px 30px;
    grid-auto-flow: row;
    line-height: 2rem;
    .item-a {
        grid-column: 1;
        grid-row: 1 / 4;
        background: red;
        overflow: hidden;
    }
    .item-e {
        grid-column-start: 5;
        grid-column-end: span 2;
        grid-row-start: 1;
        grid-row-end: span 2;
        background-color: yellow;
    }
}

</style>