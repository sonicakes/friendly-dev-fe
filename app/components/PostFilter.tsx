type PostFilterProps = {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

const PostFilter = ({searchQuery, onSearchChange}: PostFilterProps) => {
    return ( <div>
        <input 
        type="text" 
        placeholder="search text..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full py-2 px-4 text-white bg-gray-800 border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div> );
}
 
export default PostFilter;