import MemberCellComp from './MemberCell'

const MemberRowComp = ({index, style, data}) => {
    let member = data.members[index]
    
    return (
        <div key={index} style={style}>
            {/* {index} {member?.id} */}
            {data.user && <MemberCellComp
					key={index}
					member={member}
					user={data.user}
					edit={data.canEdit}
					delete={data.canDelete}
				/>}
        </div>
    )
}

export default MemberRowComp;