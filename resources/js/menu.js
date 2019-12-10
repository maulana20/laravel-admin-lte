const menu = {
	administration: [
		{ name: 'user', path: 'admin-user', access: 'user-list', node: ['user-create', 'user-edit', 'user-delete'] },
		{ name: 'role', path: 'admin-role', access: 'role-list', node: ['role-create', 'role-edit', 'role-delete'] },
		{ name: 'show user log', path: 'admin-user-log', access: 'user-log-list', node: [] }
	],
	accounting: [
		{ name: 'coa', path: 'accounting-coa', access: 'coa-list', node: [] },
		{ name: 'jurnal', path: 'accounting-jurnal', access: 'jurnal-list', node: [] },
		{ name: 'general ledger', path: 'accounting-general-ledger', access: 'general-ledger-list', node: [] },
		{ name: 'trial balance', path: 'accounting-trial-balance', access: 'trial-balance-list', node: [] },
		{ name: 'balance sheet', path: 'accounting-balance-sheet', access: 'balance-sheet-list', node: [] },
		{ name: 'period', path: 'accounting-period', access: 'period-list', node: [] },
		{ name: 'posting', path: 'accounting-posting', access: 'posting-list', node: [] },
		{ name: 'closing', path: 'accounting-closing', access: 'closing-list', node: [] }
	],
	finance: [
		{ name: 'general cash back', path: 'finance-general-cb', access: 'general-cb-list', node: [] },
		{ name: 'inter cash back', path: 'finance-inter-cb', access: 'inter-cb-list', node: [] }
	]
}

export default menu
