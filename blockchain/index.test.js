const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
	let bc, bc2;

	beforeEach(() => {
		bc = new Blockchain();
		bc2 = new Blockchain();
	});

	it('The blockchain starts with the genesis function', ()=>{
		expect(bc.chain[0]).toEqual(Block.genesis());
	});

	it('adds a new block', () => {
		const data = 'foo';
		bc.addBlock(data);

		expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
	});

	it('Validates a valid chain', () => {
		bc2.addBlock('foo');

		expect(bc.isValidChain(bc2.chain)).toBe(true);

	});

	it('Invalidates a chain with corrupt genesis block', () => {
		bc2.chain[0].data = 'Bad data';
		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('Invalidates a corrupt chain', () => {
		bc2.addBlock('foo');
		bc2.chain[1].data = 'Not foo';
		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('It replaces a chain with valid chain', () => {
		bc2.addBlock('zoo');
		bc.replaceChain(bc2.chain);

		expect(bc.chain).toEqual(bc2.chain);
	});

	it('Does not replace the chain with less than or equal to length', () => {
		bc.addBlock('foo');
		bc.replaceChain(bc2.chain);

		expect(bc.chain).not.toEqual(bc2.chain);
	});
})