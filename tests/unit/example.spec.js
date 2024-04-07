describe('example component', () =>{

  test('debe de ser mayo a 10', () => {
      let value = 10
      value = value + 2
      // expect significa espera
      // toBeGreaterThan singifica un numero mayor que
      expect(value).toBeGreaterThan(10)
  })

})