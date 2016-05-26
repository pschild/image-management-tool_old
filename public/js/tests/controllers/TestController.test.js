describe("myFunction", function() {
    var myfunc = NS.myFunction;
 
    beforeEach(function(){
        spyOn(myfunc, 'init').and.callThrough();
    });
 
    afterEach(function() {
        myfunc.reset();
    });
 
    it("should be able to initialize", function() {
        expect(myfunc.init).toBeDefined();
        myfunc.init();
        expect(myfunc.init).toHaveBeenCalled();
    });
 
    it("should populate stuff during initialization", function(){
        myfunc.init();
        expect(myfunc.stuff.length).toEqual(1);
        expect(myfunc.stuff[0]).toEqual('Testing');
    });
    
    describe("appending strings", function() {
        it("should be able to append 2 strings", function() {
            expect(myfunc.append).toBeDefined();
        });

        it("should append 2 strings", function() {
            expect(myfunc.append('hello', 'world')).toEqual('hello world');
        });
    });

    describe("adding two numbers", function() {
        it("should be able to add 2 numbers", function() {
            expect(myfunc.add).toBeDefined();
        });

        it("should add 2 numbers", function() {
            expect(myfunc.add(41, 1)).toEqual(42);
            expect(myfunc.add(-12, 13)).toEqual(1);
            expect(myfunc.add("x", "y")).toEqual(NaN);
            expect(myfunc.add(1, undefined)).toEqual(NaN);
            expect(myfunc.add("12", "12")).toEqual(NaN);
        });
    });

});