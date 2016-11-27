// Load dependencies.
const expect  = require("chai").expect;
const SpellChecker = require('./index.js');

describe("Module methods", function() {
    it("getDictionary() and getDictionarySync()", function(done) {
        // Get async dictionary.
        SpellChecker.getDictionary("en-US", function(err, asyncDict) {
            // Dictionary should be loaded.
            expect(asyncDict).to.not.be.null;
            
            // Get sync dictionary.
            var syncDict = SpellChecker.getDictionarySync("en-US");
            expect(syncDict).to.not.be.null;
            
            done();
        });
    });
});


describe("Dictionary methods", function() {
    var dictionary = null;
    
    // Load dictionary.
    before(function (done) {
        SpellChecker.getDictionary("en-US", function(err, dict) {
            dictionary = dict;
            done();
        });
    });
  
    describe("spellCheck()", function() {
        it("should return true for 'December'", function() {
            expect(dictionary.spellCheck('December')).to.be.true;
        });
        it("should return true for 'december'", function() {
            expect(dictionary.spellCheck('december')).to.be.true;
        });
        it("should return true for 'house'", function() {
            expect(dictionary.spellCheck('house')).to.be.true;
        });
        it("should return true for 'a'", function() {
            expect(dictionary.spellCheck('a')).to.be.true;
        });
        it("should return true for 'zymurgy'", function() {
            expect(dictionary.spellCheck('zymurgy')).to.be.true;
        });
        it("should return true for \"Zorro's\"", function() {
            expect(dictionary.spellCheck("Zorro's")).to.be.true;
        });
        it("should return false for 'housec'", function() {
            expect(dictionary.spellCheck('housec')).to.be.false;
        });
        it("should return false for 'decembe'", function() {
            expect(dictionary.spellCheck('decembe')).to.be.false;
        });
    });
  
    describe("isMisspelled()", function() {
        it("should return false for 'December'", function() {
            expect(dictionary.isMisspelled('December')).to.be.false;
        });
        it("should return false for 'december'", function() {
            expect(dictionary.isMisspelled('december')).to.be.false;
        });
        it("should return false for 'house'", function() {
            expect(dictionary.isMisspelled('house')).to.be.false;
        });
        it("should return false for 'a'", function() {
            expect(dictionary.isMisspelled('a')).to.be.false;
        });
        it("should return false for 'zymurgy'", function() {
            expect(dictionary.isMisspelled('zymurgy')).to.be.false;
        });
        it("should return false for \"Zorro's\"", function() {
            expect(dictionary.isMisspelled("Zorro's")).to.be.false;
        });
        it("should return true for 'housec'", function() {
            expect(dictionary.isMisspelled('housec')).to.be.true;
        });
        it("should return true for 'decembe'", function() {
            expect(dictionary.isMisspelled('decembe')).to.be.true;
        });
    });

    describe("getSuggestions()", function() {
        it("should get suggestions for 'house'", function() {
            expect(dictionary.getSuggestions('house').length).to.be.above(0);
        });
        it("should get suggestions for 'housec'", function() {
            expect(dictionary.getSuggestions('housec').length).to.be.above(0);
        });
    });

    describe("checkAndSuggest()", function() {
        it("should return true and get suggestions for 'house'", function() {
            var res = dictionary.checkAndSuggest('house');
            expect(res.misspelled).to.be.false;
            expect(res.suggestions.length).to.be.above(0);
        });
        it("should return false and get suggestions for 'housec'", function() {
            var res = dictionary.checkAndSuggest('housec');
            expect(res.misspelled).to.be.true;
            expect(res.suggestions.length).to.be.above(0);
        });
    });
});
