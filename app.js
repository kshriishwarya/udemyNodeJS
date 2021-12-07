const fs=require('fs')
fs.exists(`./data/${process.argv[2]}`, function (exists) {
    if(exists)
    {
console.log('already exists')        
}
else
{
    fs.appendFile(`./data/names.txt`,process.argv[2],(err,res)=>{
        if(err)
        {
            throw err
        }
        else
        {
           
                fs.writeFile(`./data/${process.argv[2]}`,'You are awesome',{flag: 'wx'},(err,res)=>{
                    if(err)
                    {
                        throw err
                    }
                        })
            
           
        }
        
        })
}
})


