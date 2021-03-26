module.exports = {
	Query: {
		company: async (_, args, { prisma }) => {
			const company = await prisma.company.findMany({
				include: {
					job: true,
					review: true,
				}
			});
			return company;
		},
		job: async (_, args, { prisma }) => {
			return await prisma.job.findMany({
				include: {
					company: true
				}
			});
		},
		// findCompanyByName: async (_, { name }, { prisma }) => {
		// 	const company = await prisma.company.findMany({
		// 		where: {
		// 			email: name
		// 		},
		// 		include: {
		// 			job: true,
		// 			review: true
		// 		}
		// 	})
		//
		// 	return company;
		// }
	},
	Mutation: {
		addCompany: async (_, { name, email }, { prisma }) => {
			const newCompany = await prisma.company.create({
				data: {
					name,
					email
				}
			});

			return newCompany;
		},
		createNewJob: async (_, { title, description, role, email, name }, { prisma }) => {
			const newJob = await prisma.job.create({
				data: {
					title,
					description,
					role,
					company: {
						connectOrCreate: {
							where: {
								email
							},
							create: {
								email,
								name
							}
						}
					}
				},
				include: {
					company: true
				}
			});

			return newJob;
		},
		writeReview: async (_, { star, description, email, name }, { prisma }) => {
			const newReview = await prisma.review.create({
				data: {
					star,
					description,
					company: {
						connectOrCreate: {
							where: {
								email
							},
							create: {
								email,
								name
							}
						}
					}
				},
				include: {
					company: true
				}
			});

			return newReview;
		},
	}
}